import puppeteer from "puppeteer";
import { Cluster } from "puppeteer-cluster";
import JobListing from "./models/JobListing.js";
import mongoose from "mongoose";

const webScrapeCronGoogle = async () => {
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

  const scrapeGoogleJobs = async () => {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 4,
        puppeteerOptions: { headless: true, timeout: 0 },
      });
      const jobListings = [];
      await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);

        await page.waitForSelector("#search-results");

        const jobListingLinks = await page.$$("#search-results > li > div > a");

        for (const jobLink of jobListingLinks) {
          const jobListingUrl = await jobLink.evaluate((el) => el.href);

          const jobListingPage = await browser.newPage();
          await jobListingPage.goto(jobListingUrl);
          await jobListingPage.waitForSelector(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded"
          );

          const title = await jobListingPage.$eval(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__header.gc-job-detail__header > h1",
            (ele) => ele.textContent.trim()
          );
          const locationEle = await jobListingPage.$$(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__header.gc-job-detail__header > ul.gc-job-tags.gc-job-detail__tags > li > div > span"
          );

          const loc1 = await locationEle[0]?.evaluate((ele) =>
            ele.textContent.trim()
          );
          const loc2 = await locationEle[1]?.evaluate((ele) =>
            ele.textContent.trim()
          );
          const loc3 = await locationEle[2]?.evaluate((ele) =>
            ele.textContent.trim()
          );

          const location =
            loc1 != undefined
              ? loc1
              : "" + loc2 != undefined
              ? loc2
              : "" + loc3 != undefined
              ? loc3
              : "";
          const qualifications = await jobListingPage.$eval(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__content > div.gc-job-detail__section.gc-job-detail__section--qualifications",
            (ele) => ele.textContent.trim()
          );
          const basicQualificationIdx = qualifications.indexOf(
            "Minimum qualifications"
          );
          const preferredQualificatonIdx = qualifications.indexOf(
            "Preferred qualifications"
          );
          const basicQualification =
            qualifications.slice(
              basicQualificationIdx,
              basicQualificationIdx + 23
            ) +
            "\n" +
            qualifications.slice(
              basicQualificationIdx + 23,
              preferredQualificatonIdx
            );

          const preferredQualificaton =
            qualifications.slice(
              preferredQualificatonIdx,
              preferredQualificatonIdx + 25
            ) +
            "\n" +
            qualifications.slice(
              preferredQualificatonIdx + 25,
              qualifications.length
            );

          const description = await jobListingPage.$eval(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__content > div.gc-job-detail__section.gc-job-detail__section--description",
            (ele) => ele.textContent.trim()
          );
          const respons = await jobListingPage.$eval(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__content > div.gc-job-detail__section.gc-job-detail__section--responsibilities > div",
            (ele) => ele.textContent.trim()
          );
          const applyUrl = await jobListingPage.$eval(
            "#jump-content > main > div > div.wrapper__maincol > div > div > div > div.gc-card.gc-card--expanded.gc-job-detail.gc-job-detail--loaded > div.gc-card__header.gc-job-detail__header > div > a",
            (ele) => ele.getAttribute("href")
          );
          const type = description.includes("Internship")
            ? "Internship"
            : "Full Time";

          jobListings.push({
            title,
            location,
            companyName: "Google",
            description,
            responsibilities: respons,
            applyUrl,
            type,
            basicQualification,
            preferredQualificaton,
          });

          await jobListingPage.close();
        }
      });

      for (let i = 1; i <= 34; i++) {
        await cluster.queue(
          `https://careers.google.com/jobs/results/?page=${i}`
        );
      }
      await cluster.idle();
      await cluster.close();
      await browser.close();
      return jobListings;
    } catch (error) {
      console.log(error);
    }
  };

  let num = 1;
  const jobs = await scrapeGoogleJobs();
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
      title: jobs[i].title,
    });
    if (!find.length) {
      const job = new JobListing({
        companyName: "Google",
        jobId: 1000000 + num++,
        title: jobs[i].title,
        type: jobs[i].type,
        location: jobs[i].location,
        applyUrl: jobs[i].applyUrl,
        description: jobs[i].description,
        basicQualification: jobs[i].basicQualification,
        preferredQualificaton: jobs[i].preferredQualificaton,
        applied: [],
        lastUpdated: dateString,
        responsibilities: jobs[i].responsibilities,
      });
      await job.save();
    }
  }

  await db.close();
};

webScrapeCronGoogle();
export { webScrapeCronGoogle };
