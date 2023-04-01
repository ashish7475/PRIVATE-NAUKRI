import cron from "node-cron";

const job = cron.schedule(
  "* * * * * *",
  () => {
    console.log("Hi");
  },
  {
    name: "Ashish",
  }
);

const j = cron.getTasks();

setTimeout(() => {
  const job = j.get("Ashish");
  job.stop();
}, 3000);
