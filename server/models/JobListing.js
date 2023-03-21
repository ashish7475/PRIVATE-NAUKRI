import mongoose from "mongoose";

const JobListingSchema = new mongoose.Schema({
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
  applied: Boolean,
  lastUpdated: String,
  applied: { type: [Object], default: [] },
  responsibilities: {
    type: String,
    default: "",
  },
});

const JobListing = mongoose.model("JobListing", JobListingSchema);

export default JobListing;
