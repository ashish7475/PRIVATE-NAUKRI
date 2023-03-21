import cron from "node-cron";
import { webScrapeCron } from "./amazonScript.js";
import { webScrapeCronGoogle } from "./googleScript.js";
import { jobListingsEmail } from "./utility/index.js";

cron.schedule("* 10 * * *", async () => {
  console.log("Running Amazon Scrape");
  await webScrapeCron();
});

cron.schedule("30 10 * * *", async () => {
  console.log("Running Google Scrape");
  await webScrapeCronGoogle();
});

cron.schedule("27 0 * * *", async () => {
  console.log("Email Sent");
  await jobListingsEmail();
});
