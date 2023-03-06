import cron from "node-cron";
import webScrapeCron from "./careerScript.js";

// Schedule the task to run at 1:45 AM every day
cron.schedule("57 3 * * *", async () => {
  console.log("Running careerScript.js");
  await webScrapeCron();
});
