import mongoose from "mongoose";
import JobListing from "./models/JobListing.js";
import ApplyHistory from "./models/ApplyHistory.js";
import Testimonial from "./models/Testimonials.js";
import nodemailer from "nodemailer";
import PasswordResetToken from "./models/PasswordResetToken.js";
import User from "./models/user.js";
import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected");
  });

await JobListing.deleteMany();
await ApplyHistory.deleteMany();
