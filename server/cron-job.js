import cron from "node-cron";
import { webScrapeCron } from "./careerScript.js";
import { jobListingsEmail } from "./utility/index.js";

// Schedule the task to run at 1:45 AM every day
cron.schedule("* 10 * * *", async () => {
  console.log("Running careerScript.js");
  await webScrapeCron();
});

cron.schedule("23 0 * * *", async () => {
  console.log(`Email sent`);
  jobListingsEmail();
});
