import JobListing from "../models/JobListing.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Testimonial from "../models/Testimonials.js";
import cron from "node-cron";
import ApplyHistory from "../models/ApplyHistory.js";
import { customAlphabet } from "nanoid";
import Sentiment from "sentiment";
import nodemailer from "nodemailer";
import {
  contactUsEmail,
  sendResetEmail,
  sendWelcomeMail,
} from "../utility/index.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import PasswordResetToken from "../models/PasswordResetToken.js";
import InterviewReminder from "../models/InterviewReminder.js";
dotenv.config();

const sentiment = new Sentiment(); //! npm package for sorting testimonials

//! JOB Listings START
const getJobListing = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const type = req.query.filters?.type;
    const companies = req.query.filters?.companies;
    const countries = req.query.filters?.countries || [];
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const skip = (page - 1) * pageSize;
    const query = {
      title: { $regex: searchQuery, $options: "i" },
    };
    if (type != "") {
      query.type = type;
    }
    if (companies && companies.length > 0) {
      query.companyName = { $in: companies };
    }

    const totalListings = await JobListing.find(query).count();

    const listings = await JobListing.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();
    const ls = await JobListing.find({
      title: { $regex: searchQuery, $options: "i" },
    });

    res.status(200).json({ data: [...listings], totalListings });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const jobId = req.query.jobId;

    const job = await JobListing.findOne({ jobId });

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
  }
};

const userSignup = async (req, res) => {
  const { name, username, email, password } = req.body;
  const { path } = req?.file || "";

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  const usernameCount = await User.find({ username }).count();
  const emailCount = await User.find({ email }).count();

  if (usernameCount !== 0) {
    res.status(200).json({ message: "Username already taken!", status: 400 });
  } else if (emailCount !== 0) {
    res.status(200).json({ message: "Email already registered!", status: 400 });
  } else {
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      profilePhotoUrl: path,
    });
    sendWelcomeMail({ name, email });
    res
      .status(200)
      .json({ message: "User Registered Successfully!", status: 200 });
  }
};

//! JOB LISTINGS END

//! USER START

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.send({ message: "User not registered !", status: "error" });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.send({
        message: "Login Successful",
        token: token,
        status: "ok",
        user: user,
      });
    } else {
      res.send({ status: "error", message: "Incorrect Password" });
    }
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const username = req.username;

    const path = req.file.path;
    await User.updateOne({ username }, { profilePhotoUrl: path });
    await Testimonial.updateMany({ username }, { photoUrl: path });

    res.status(200).json({
      message: "Profile Photo Updated Successfully !",
      url: req.file.path,
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    const user = await PasswordResetToken.findOne({ token });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      console.log(newPassword, user.username);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );
      await PasswordResetToken.deleteOne({ token });
      res.status(200).json({ message: "Password changed successfully." });
    } else {
      res.status(500).json({ message: "Invalid Request" });
    }
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const username = req.username;

    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      res.status(202).json({ message: "Old password is incorrect !" });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(newpassword, salt);
      await User.updateOne({ username }, { password: hashedPassword });

      res.status(200).json({
        message: "Password Changed Successfully !",
        password: hashedPassword,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  //! checking if the username exists
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Email not found !" });
  } else {
    const name = user.name;
    const email = user.email;
    const token = jwt.sign(
      {
        name,
        email,
      },
      process.env.JWT_SECRET
    );
    await PasswordResetToken.create({ username: user.username, token });
    sendResetEmail(name, email, token);
    res
      .status(200)
      .json({ message: "Please Check your email for password reset" });
  }
};
//! USER ENDS

//! TESTIMONIALS START

const addTestimonial = async (req, res) => {
  try {
    const { username, name, photoUrl, testimonial, title } = req.body;

    const score = sentiment.analyze(testimonial);

    const newTestimonial = await Testimonial.create({
      username,
      title,
      name,
      photoUrl,
      testimonial,
      positive: score.score >= 0 ? true : false,
    });
    res
      .status(200)
      .json({ message: "Testimonial Added Successfully", status: "ok" });
  } catch (error) {
    console.log(error);
  }
};
const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({ positive: true })
    .limit(10)
    .exec();

  res.status(200).json(testimonials);
};

//! TESTIMONIALS END

//! APPLY HISTORY START

const getAppliedHistory = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const username = req.username;
    const type = req.query.filters.type;
    const companies = req.query.filters.companies;
    const countries = req.query.filters?.countries || [];
    const page = parseInt(req.query.currentPage) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const query = {
      title: { $regex: searchQuery, $options: "i" },
      username,
    };
    if (type != "") {
      query.type = type;
    }
    if (companies && companies.length > 0) {
      query.company = { $in: companies };
    }
    const totalAppliedQuery = await ApplyHistory.find(query).count();
    const totalApplied = await ApplyHistory.find().count();

    const appliedJobs = await ApplyHistory.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();

    res.status(200).json({ appliedJobs, totalApplied, totalAppliedQuery });
  } catch (error) {
    console.log(error);
  }
};

const updateAppliedStatus = async (req, res) => {
  try {
    const { jobId, status, currentStatus } = req.body;
    const username = req.username;
    const id = parseInt(jobId);

    const reminder = await InterviewReminder.find({ username, jobId });
    if (currentStatus === "Interview" && reminder.length) {
      res.status(203).json({
        message:
          "This job has an active interview reminder set. Please delete the reminder for this job and then change the status.",
      });
    } else {
      await ApplyHistory.updateOne({ jobId: id, username }, { status });

      res.status(200).json({ message: `Status changed to ${status}` });
    }
  } catch (error) {
    console.log(error);
  }
};

const addAppliedHistory = async (req, res) => {
  try {
    const { jobId, title, location, type, companyName } = req.body.record;
    const username = req.username;
    console.log(jobId);
    await JobListing.updateOne(
      { jobId },
      { $push: { applied: { username, appliedAt: new Date() } } }
    );
    const updated = await JobListing.findOne({ jobId });
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
    const day = now.getDate();
    const dateString = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    await ApplyHistory.create({
      username,
      jobId,
      title,
      location,
      type,
      company: companyName,
      appliedAt: dateString,
      status: "Applied",
    });

    res.status(200).json({ message: "Applied Successfully", updated });
  } catch (error) {
    console.log(error);
  }
};

const getApplyStats = async (req, res) => {
  try {
    const username = req.username;
    const appliedJobs = await ApplyHistory.find({ username });

    const rejected = appliedJobs.filter((job) => job.status === "Rejected");
    const applied = appliedJobs.filter((job) => job.status === "Applied");
    const interview = appliedJobs.filter((job) => job.status === "Interview");
    const placed = appliedJobs.filter((job) => job.status === "Placed");
    const fulltime = appliedJobs.filter((job) => job.type === "Full Time");
    const internship = appliedJobs.filter((job) => job.type === "Internship");
    const amazon = appliedJobs.filter((job) => job.company === "Amazon");
    const google = appliedJobs.filter((job) => job.company === "Google");
    const apple = appliedJobs.filter((job) => job.company === "Apple");
    const netflix = appliedJobs.filter((job) => job.company === "Netflix");

    res.status(200).json({
      appliedJobs,
      rejected,
      applied,
      interview,
      placed,
      fulltime,
      internship,
      amazon,
      google,
      apple,
      netflix,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteApplyHistory = async (req, res) => {};

//! APPLY HISTORY ENDS

const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    contactUsEmail(name, email, subject, message);
    res.status(200).json({
      message: "Message sent successfully! Our team will contact you soon.",
    });
  } catch (error) {
    console.log(error);
  }
};

//! INTERVIEWS REMINDERS STARTS

const setCustomReminder = async (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const time = req.body.time;
  const username = req.body.username;
  const phone = req.body.phone;
  const choice = req.body.choice;
  const title = req.body.title;
  const type = req.body.type;
  const company = req.body.company;
  const generateID = customAlphabet("0123456789", 8);
  const jobId = generateID();

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const [hrs, min, sec] = time.split(":");
  // ${sec} ${min} ${hrs} ${day} ${month} * ${year}
  if (choice === "email") {
    await InterviewReminder.create({
      username,
      title,
      type,
      jobId,
      company,
      reminderDate: date,
      reminderTime: time,
      cronExpression: `${sec} ${min} ${hrs} ${day} ${month + 1} * ${year}`,
      status: "Active",
    });

    const cronJob = cron.schedule(
      `${sec} ${min} ${hrs} ${day} ${month + 1} * ${year}`,
      async () => {
        console.log("Reminder Starting");
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        const message = `
     <html lang="en">
   <body style='font-family: Arial, sans-serif;
         font-size: 16px;
         line-height: 1.5;' >
     <div class="container" style=' max-width: 800px;
         margin: 0 auto;'>
       Dear ${username},
       <br>
       You have an upcoming interview at ${company} for ${type} titled ${title} (job-id ${jobId} ).
       Please be sure to arrive at least 10-15 minutes before your scheduled interview time to complete any necessary paperwork and to ensure a prompt start time.
       <br>
       If you have any questions or concerns regarding the interview or its location, please do not hesitate to contact ${company} careers team. They are there to help yu in any way.
       We wish you the best of luck with your interview.<br>
       <span>Sincerely</span>
       <br>
      <span> PRIVATE NAUKRI <span>
       </div>
       
      
       
       <div class="disclaimer" style="margin-top: 2rem;
      font-size: 14px;
      color: #999;">
      <p> You are receiving this mail because you had set a reminder from your profile.
       In case you had not set any such reminder please <a href='https://private-naukri-ashish.netlify.app/contactus'>contact us</a>
       Please do not reply to this email.This is an auto generated email and our support team wont be able to answer to any mails if replied.<br>In case of any queries please mail us at private.naukri.ashish@gmail.com</p>
    </div>
     </div>
   </body>
   </html>
     `;
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: `Interview Reminder - ${title}`,
          html: message,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
        await InterviewReminder.deleteOne({ username, jobId });
      },
      {
        name: username + jobId,
      }
    );

    cronJob.start();
    res.status(200).json({ message: "Reminder set successfully." });
  } else if (choice == "textmessage") {
  }
};

const setInterviewReminder = async (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const time = req.body.time;
  const username = req.body.username;
  const phone = req.body.phone;
  const choice = req.body.choice;
  const jobId = req.body.jobId;
  const job = await JobListing.findOne({ jobId });
  const title = job.title;
  const type = job.type;
  const company = req.body.company;
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const [hrs, min, sec] = time.split(":");
  // ${sec} ${min} ${hrs} ${day} ${month} * ${year}
  if (choice === "email") {
    const cronJ = await InterviewReminder.find({ username, jobId });

    if (cronJ.length) {
      res.status(203).json({ message: `Reminder already set for this job` });
    } else {
      await InterviewReminder.create({
        username,
        jobId,
        title,
        type,
        company,
        reminderDate: date,
        reminderTime: time,
        cronExpression: `${sec} ${min} ${hrs} ${day} ${month + 1} * ${year}`,
        status: "Active",
      });

      const cronJob = cron.schedule(
        `${sec} ${min} ${hrs} ${day} ${month + 1} * ${year}`,
        async () => {
          console.log("Reminder Starting");
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          const message = `
     <html lang="en">
   <body style='font-family: Arial, sans-serif;
         font-size: 16px;
         line-height: 1.5;' >
     <div class="container" style=' max-width: 800px;
         margin: 0 auto;'>
       Dear ${username},
       <br>
       You have an upcoming interview at ${company} for ${type} titled ${title} (job-id ${jobId}).
       Please be sure to arrive at least 10-15 minutes before your scheduled interview time to complete any necessary paperwork and to ensure a prompt start time.
       <br>
       If you have any questions or concerns regarding the interview or its location, please do not hesitate to contact ${company} careers team. They are there to help yu in any way.
       We wish you the best of luck with your interview.<br>
       <span>Sincerely</span>
       <br>
      <span> PRIVATE NAUKRI <span>
       </div>
       
      
       
       <div class="disclaimer" style="margin-top: 2rem;
      font-size: 14px;
      color: #999;">
      <p> You are receiving this mail because you had set a reminder from your profile.
       In case you had not set any such reminder please <a href='https://private-naukri-ashish.netlify.app/contactus'>contact us</a>
       Please do not reply to this email.This is an auto generated email and our support team wont be able to answer to any mails if replied.<br>In case of any queries please mail us at private.naukri.ashish@gmail.com</p>
    </div>
     </div>
   </body>
   </html>
     `;
          const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `Interview Reminder - ${title}`,
            html: message,
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          });
          await InterviewReminder.deleteOne({ username, jobId });
        },
        {
          name: username + jobId,
        }
      );

      res.status(200).json({ message: "Reminder set successfully." });
    }
  } else if (choice == "textmessage") {
  }
};
const stopInterviewReminder = async (req, res) => {
  try {
    const username = req.body.username;
    const jobId = req.body.jobId;

    const cronJob = await InterviewReminder.findOne({ username, jobId });
    if (cronJob) {
      const jobs = cron.getTasks();
      setTimeout(() => {
        const job = jobs.get(username + jobId);
        job.stop();
        InterviewReminder.updateOne(
          { username, jobId },
          { status: "Stopped" }
        ).then(() => {
          res.status(200).json({
            message: `Reminder for Job ID : ${jobId} stopped. You'll no longer receive the reminder. You can resume the reminder before the set date and time.`,
          });
        });
      }, 5000); // delay for 5 seconds before stopping the job
    } else {
      res.status(202).json({ message: "No cron job found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const getInterviewReminder = async (req, res) => {
  try {
    const username = req.username;
    const reminders = await InterviewReminder.find({ username });
    if (!reminders.length) {
      res.status(202).json({ message: "No Reminders found." });
    } else {
      res.status(200).json({ reminders });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteInterviewReminder = async (req, res) => {
  try {
    const username = req.body.username;
    const jobId = req.body.jobId;

    const cronJob = await InterviewReminder.findOne({ username, jobId });
    if (cronJob) {
      const jobs = cron.getTasks();
      setTimeout(() => {
        const job = jobs.get(username + jobId);
        if (job !== undefined) {
          job.stop();
        }
        InterviewReminder.deleteOne({ username, jobId }).then(() => {
          res.status(200).json({
            message: `Reminder for Job ID : ${jobId} deleted. You'll no longer receive the reminder.`,
          });
        });
      }, 5000);
    } else {
      res.status(202).json({ message: "No cron job found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const resumeInterviewReminder = async (req, res) => {
  try {
    const username = req.body.username;
    const jobId = req.body.jobId;

    const cronJob = await InterviewReminder.findOne({
      username,
      jobId,
      status: "Stopped",
    });
    if (cronJob) {
      const jobs = cron.getTasks();
      setTimeout(() => {
        jobs.get(username + jobId).start();
        InterviewReminder.updateOne(
          { username, jobId },
          { status: "Active" }
        ).then(() => {
          res.status(200).json({
            message: `Reminder for Job ID : ${jobId} resumed.`,
          });
        });
      }, 5000);

      res.status(200).json({
        message: `Reminder for Job ID : ${jobId} resumed. You ll be recieving the reminder on the same time.`,
      });
    } else {
      res.status(202).json({ message: "No reminder found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getInterviews = async (req, res) => {
  try {
    const { username, company, type } = req.body;

    const query = {};
    if (company !== null || company != undefined || company != "") {
      query.company = company;
    }
    if (type !== "") {
      query.type = type;
    }

    const jobs = await ApplyHistory.find({
      username,
      ...query,
      status: "Interview",
    });
    if (jobs.length === 0) {
      res.status(202).json({
        message: `You dont have any ${type} job interviews from ${company}`,
      });
    } else {
      res.status(200).json({ jobs });
    }
  } catch (error) {
    console.log(error);
  }
};

const inviteFriends = (req, res) => {
  try {
    const emails = req.body.emails.split(",");
    const Emails = emails
      .map((em) => em.trim())
      .filter((em) => em.includes("@gmail.com"));

    if (!Emails.length) {
      res
        .status(202)
        .json({ message: "Please enter atleast one valid Gmail address!" });
    } else {
      const userEmail = req.body.userEmail;
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const message = `
  <html lang="en">
<body style='font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;' >
  <div class="container" style=' max-width: 800px;
      margin: 0 auto;'>
    <h1>Private Naukri</h1>
    <div class="message" style="margin-bottom: 1rem;">
      <p>An invite from your friend ${userEmail}</p>
      <p>
I wanted to personally invite you to join PRIVATE NAUKRI, the ultimate job board application that will help you find your dream job faster and easier than ever before.
<br>
With PRIVATE NAUKRI, you can:
<br>
<ol>

<li>Set interview reminders to ensure that you never miss an important interview again.</li>
<li>Analyze your performance through powerful statistics to help you improve your job search strategy.</li>
<li>Discover new job opportunities that match your skills and experience.</li>
</ol>
<br>

So what are you waiting for? Join PRIVATE NAUKRI today and take your job search to the next level!

    </div>
    
  </div>
</body>
</html>
  `;

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: Emails,
        subject: "Join PRIVATE NAUKRI and Supercharge Your Job Search!",
        html: message,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.status(200).json({ message: "Invite sent successfully." });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//! INTERVIEWS REMINDERS ENDS

export {
  getJobListing,
  getJobDetails,
  userLogin,
  userSignup,
  addTestimonial,
  getTestimonials,
  getAppliedHistory,
  addAppliedHistory,
  updateAppliedStatus,
  updateProfilePhoto,
  forgetPassword,
  setInterviewReminder,
  resetPassword,
  getApplyStats,
  changePassword,
  contactUs,
  getInterviews,
  deleteApplyHistory,
  deleteInterviewReminder,
  stopInterviewReminder,
  getInterviewReminder,
  resumeInterviewReminder,
  inviteFriends,
  setCustomReminder,
};
