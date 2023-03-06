import puppeteer from "puppeteer";
import mongoose from "mongoose";
import AmazonJobListing from "./models/AmazonJobListing.js";
import { config } from "dotenv";

const webScrapeCron = async () => {
  try {
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
      const jobListings = [];
      let offset = 0;
      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      await page.goto(
        `https://www.amazon.jobs/en/job_categories/software-development?offset=${offset}&country%5B%5D=IND&`,
        {
          waitUntil: "load",
          // Remove the timeout
          timeout: 0,
        }
      );

      let limit = 0;
      const btns = await page.$$eval(
        "#search-results-box > div.search-page > div > div > div.container > content > div > div > div.col-md-8.search-page-job-list > div.list-footer > div.d-none.d-md-block > div > div > button",
        (elements) =>
          elements.map((el) =>
            el.hasAttribute("data-label") ? el.getAttribute("data-label") : null
          )
      );

      if (btns.length) {
        for (let i = btns.length - 1; i >= 0; i--) {
          if (parseInt(btns[i])) {
            limit = (btns[i] - 1) * 10;
            break;
          }
        }
      }
      //! We limited the listings due to the NavigationTimeout error
      limit = limit > 30 ? 30 : limit;
      let hasNextPage = true;

      while (hasNextPage) {
        const jobListingLinks = await page.$$(
          "#search-results-box > div.search-page > div > div > div.container > content > div > div > div.col-md-8.search-page-job-list > div > div > div> a"
        );

        for (const jobListingLink of jobListingLinks) {
          const location = await jobListingLink.$eval(
            "div.info.first.col-12.col-md-8 > p",
            (ele) => ele.textContent.split("|")[0].trim()
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
            jobContent.slice(
              basicQualificationIdx,
              basicQualificationIdx + 20
            ) +
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
        offset += 10;
        //! Untill we have a next page we keep moving to next page
        if (offset <= limit) {
          const nextPageUrl = `https://www.amazon.jobs/en/job_categories/software-development?offset=${offset}&country%5B%5D=IND&`;

          console.log(offset);
          await page.goto(nextPageUrl);
        } else {
          hasNextPage = false;
        }
      }

      await browser.close();

      return jobListings;
    };

    const jobs = await scrapeJobListings();

    //* Some jobs might be acquired in time and some might be new , so in order to balance , we delete all before saving to db everytime.
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
    const day = now.getDate();
    const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    for (let i = 0; i < jobs.length; i++) {
      //! If listing is already present we skip
      const find = await AmazonJobListing.find({
        jobId: jobs[i].jobID,
      });
      if (!find.length) {
        const job = new AmazonJobListing({
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
        });
        await job.save();
      }
    }

    await db.close();
  } catch (error) {
    console.log(error);
  }
};
webScrapeCron();
export default webScrapeCron;
