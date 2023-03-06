import mongoose from "mongoose";

const ApplyHistorySchema = new mongoose.Schema({
  username: String,
  jobId: String,
  title: String,
  location: String,
  type: String,
  appliedAt: Date,
  company: String,
});

const ApplyHistory = mongoose.model("ApplyHistory", ApplyHistorySchema);

export default ApplyHistory;
