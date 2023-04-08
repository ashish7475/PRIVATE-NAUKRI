import { Cluster } from "puppeteer-cluster";
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import JobListing from "../models/JobListing.js";
import { config } from "dotenv";

const webScrapeCron = async () => {
  const URI = `mongodb+srv://ashish729912:hQAIMkyrifmhQH8w@webscrapercluster.sagxtxf.mongodb.net/?retryWrites=true&w=majority`;
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose Connected");
    });
  const db = mongoose.connection;
  const scrapeJobListings = async () => {
    const browser = await puppeteer.launch();
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 4,
      puppeteerOptions: { headless: true, timeout: 0 },
    });
    const jobListings = [];
    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url);
      const jobListingLinks = await page.$$(
        "#search-results-box > div.search-page > div > div > div.container > content > div > div > div.col-md-8.search-page-job-list > div > div > div> a"
      );

      for (const jobListingLink of jobListingLinks) {
        const location = await jobListingLink.$eval(
          "div.info.first.col-12.col-md-8 > p",
          (ele) => ele.textContent.split("|")[0].trim().slice(0, 3)
        );

        const jobListingUrl = await jobListingLink.evaluate((el) => el.href);

        const jobListingPage = await browser.newPage();
        await jobListingPage.goto(jobListingUrl);
        const applyUrl = await jobListingPage.$eval(
          "#apply-button",
          (ele) => ele.href
        );
        const titleElement = await jobListingPage.$(
          "#job-detail > div.apply-header > div > div > div > div.info-wrapper.col-md-7.col-xl-8.col-12 > div > h1"
        );

        const jobIdElem = await jobListingPage.$(
          "#job-detail > div.apply-header > div > div > div > div.info-wrapper.col-md-7.col-xl-8.col-12 > div > div > p"
        );

        //! Getting content related to every job
        const jobContent = await jobListingPage.$eval(
          "#job-detail-body > div > div.col-12.col-md-7.col-lg-8.col-xl-9 > div",
          (ele) => ele.textContent
        );
        const jobDescriptionIdx = jobContent.indexOf("DESCRIPTION");
        const basicQualificationIdx = jobContent.indexOf(
          "BASIC QUALIFICATIONS"
        );
        const preferredQualificatonIdx = jobContent.indexOf(
          "PREFERRED QUALIFICATIONS"
        );
        const jobDescription =
          jobContent.slice(0, jobDescriptionIdx + 11) +
          "\n" +
          jobContent.slice(jobDescriptionIdx + 11, basicQualificationIdx);

        const basicQualification =
          jobContent.slice(basicQualificationIdx, basicQualificationIdx + 20) +
          "\n" +
          jobContent.slice(
            basicQualificationIdx + 20,
            preferredQualificatonIdx
          );

        const preferredQualificaton =
          jobContent.slice(
            preferredQualificatonIdx,
            preferredQualificatonIdx + 24
          ) +
          "\n" +
          jobContent.slice(preferredQualificatonIdx + 24, jobContent.length);

        const title = await titleElement.evaluate((el) =>
          el.textContent.trim()
        );

        const jobID = await jobIdElem.evaluate((el) =>
          parseInt(
            el.textContent.trim().split("|")[0].split("Job ID: ")[1].trim()
          )
        );
        const type =
          title.includes("Intern") ||
          title.includes("intern") ||
          title.includes("INTERN")
            ? "Internship"
            : "Full Time";

        jobListings.push({
          title,
          jobID,
          type,
          location,
          jobDescription,
          basicQualification,
          preferredQualificaton,
          url: applyUrl,
        });

        await jobListingPage.close();
      }
    });

    const pageUrl =
      "https://www.amazon.jobs/en/job_categories/software-development?offset=";

    for (let i = 0; i < 160; i += 10) {
      await cluster.queue(`${pageUrl}${i}`);
    }

    await cluster.idle();
    await cluster.close();
    await browser.close();

    return jobListings;
  };
  const jobs = await scrapeJobListings();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
  const day = now.getDate();
  const dateString = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  for (let i = 0; i < jobs.length; i++) {
    //! If listing is already present we skip
    const find = await JobListing.find({
      jobId: jobs[i].jobID,
    });
    if (!find.length) {
      const job = new JobListing({
        companyName: "Amazon",
        jobId: jobs[i].jobID,
        title: jobs[i].title,
        type: jobs[i].type,
        location: jobs[i].location,
        applyUrl: jobs[i].url,
        description: jobs[i].jobDescription,
        basicQualification: jobs[i].basicQualification,
        preferredQualificaton: jobs[i].preferredQualificaton,
        applied: [],
        lastUpdated: dateString,
        responsibilities: "",
      });
      await job.save();
    }
  }

  await db.close();
};
webScrapeCron();

export { webScrapeCron };
