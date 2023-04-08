import cron from "node-cron";
import { webScrapeCron } from "./amazonScript.js";
import { webScrapeCronGoogle } from "./googleScript.js";
import { jobListingsEmail } from "../utility/index.js";

cron.schedule("40 17 * * *", async () => {
  console.log("Running Amazon Scrape");
  await webScrapeCron();
});

cron.schedule("40 17 * * *", async () => {
  console.log("Running Google Scrape");
  await webScrapeCronGoogle();
});

cron.schedule("40 17 * * *", async () => {
  console.log("Email Sent");
  await jobListingsEmail();
});
