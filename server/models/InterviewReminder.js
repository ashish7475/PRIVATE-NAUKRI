import mongoose from "mongoose";

const InterviewReminderSchema = new mongoose.Schema({
  username: String,
  jobId: String,
  title: String,
  type: String,
  company: String,
  reminderDate: String,
  reminderTime: String,
  cronExpression: String,
  status: String,
});

const InterviewReminder = mongoose.model(
  "InterviewReminder",
  InterviewReminderSchema
);

export default InterviewReminder;
