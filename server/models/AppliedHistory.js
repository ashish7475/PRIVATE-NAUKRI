import mongoose from "mongoose";

const AppliedHistorySchema = new mongoose.Schema({
  username: String,
  companyName: String,
  jobId: Number,
  title: String,
  location: String,
  applyUrl: String,
  description: {
    type: String,
    maxLength: 1000000,
  },
  basicQualification: {
    type: String,
    maxLength: 1000000,
  },
  preferredQualificaton: {
    type: String,
    maxLength: 1000000,
  },
  type: String,
  appliedAt: {
    type: String,
    default: "",
  },
});

const AppliedHistory = mongoose.model("AppliedHistory", AppliedHistorySchema);

export default AppliedHistory;
