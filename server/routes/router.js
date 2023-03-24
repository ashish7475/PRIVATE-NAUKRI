import express from "express";
import multer from "multer";
import {
  addAppliedHistory,
  addTestimonial,
  changePassword,
  contactUs,
  forgetPassword,
  getAppliedHistory,
  getApplyStats,
  getJobDetails,
  getJobListing,
  getTestimonials,
  resetPassword,
  updateAppliedStatus,
  updateProfilePhoto,
  userLogin,
  userSignup,
} from "../controllers/amazonJob.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

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

routes.get("/unsubscribe/:email", async (req, res) => {
  const email = req.params.email;
  await User.updateOne({ email }, { notifications: false });
  res.send(
    "<h1>Unsubscribed Successfully</h1><p>You have successfully unsubscribed from our mailing list.</p>"
  );
});

export default routes;
