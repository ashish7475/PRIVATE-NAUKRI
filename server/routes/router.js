import express from "express";
import multer from "multer";
import {
  addAppliedHistory,
  getInterviewReminder,
  addTestimonial,
  changePassword,
  contactUs,
  deleteApplyHistory,
  deleteInterviewReminder,
  forgetPassword,
  getAppliedHistory,
  getApplyStats,
  getInterviews,
  getJobDetails,
  getJobListing,
  getTestimonials,
  resetPassword,
  resumeInterviewReminder,
  setInterviewReminder,
  stopInterviewReminder,
  updateAppliedStatus,
  updateProfilePhoto,
  userLogin,
  userSignup,
  inviteFriends,
  setCustomReminder,
} from "../controllers/amazonJob.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import path from "path";

const routes = express.Router();

const upload = multer({ dest: "uploads/" });

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.username = decoded.username;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

routes.get("/", (req, res) => {
  res.send(`<h1>Welcome to Private Naukri . This is the home route.</h1>`);
});

routes.get("/job-listings", getJobListing);
routes.get("/jobdetails", getJobDetails);

routes.post("/contactus", contactUs);

routes.post("/signup", upload.single("image"), userSignup);
routes.post("/login", userLogin);

routes.post("/forgotpassword", forgetPassword);
routes.post("/resetpassword", resetPassword);
routes.post("/changepassword", verifyToken, changePassword);

routes.post("/addtestimonial", verifyToken, addTestimonial);
routes.get("/testimonials", getTestimonials);

routes.get("/appliedhistory", verifyToken, getAppliedHistory);
routes.get("/getappliedstats", verifyToken, getApplyStats);
routes.post("/addappliedhistory", verifyToken, addAppliedHistory);
routes.post("/updateapplystatus", verifyToken, updateAppliedStatus);
routes.post(
  "/updateprofilephoto",
  verifyToken,
  upload.single("edit-image"),
  updateProfilePhoto
);
routes.post("/deleteapplyhistory", deleteApplyHistory); //! add verifyToken

routes.post("/setinterviewreminder", verifyToken, setInterviewReminder); //! add verifyToken
routes.post("/getinterviews", verifyToken, getInterviews);
routes.get("/getreminders", verifyToken, getInterviewReminder); //! add verifyToken
routes.post("/stopreminder", stopInterviewReminder); //! add verifyToken
routes.post("/deletereminder", deleteInterviewReminder); //! add verifyToken
routes.post("/resumereminder", resumeInterviewReminder); //! add verifyToken
routes.post("/customreminder", verifyToken, setCustomReminder);

routes.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (user.notifications) {
    await User.updateOne({ email }, { notifications: false });

    res.status(200).json({
      message:
        "You have successfully unsubscribed. You ll no longer receive any mails of job listings from us.If you wish to resubscribe to our services please change the status from the settings.",
    });
  } else {
    res.status(200).json({ message: "You are already unsubscribed." });
  }
});

routes.post("/invite", inviteFriends);

export default routes;
