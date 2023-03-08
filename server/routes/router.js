import express from "express";
import multer from "multer";
import {
  addAppliedHistory,
  addTestimonial,
  changeApplyStatus,
  getAppliedHistory,
  getJobDetails,
  getJobListing,
  getTestimonials,
  updateAppliedStatus,
  updateProfilePhoto,
  userLogin,
  userSignup,
} from "../controllers/amazonJob.js";
import jwt from "jsonwebtoken";

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
  res.send(`<h1>Welcome to my Node Server . This is the home route.</h1>
            <h3> Useful Routes :-</h3>
            <ol>
              <li> /amazon-job-listings</li>
              <li> /filter-jobs</li>
            </ol>
  `);
});

routes.get("/amazon-job-listings", getJobListing);
routes.get("/jobdetails", getJobDetails);
routes.post("/change/apply/status", changeApplyStatus);
routes.post("/signup", upload.single("image"), userSignup);
routes.post("/login", userLogin);
routes.post("/addtestimonial", verifyToken, addTestimonial);
routes.get("/testimonials", getTestimonials);
routes.get("/appliedhistory", verifyToken, getAppliedHistory);
routes.post("/addappliedhistory", verifyToken, addAppliedHistory);
routes.post("/updateapplystatus", verifyToken, updateAppliedStatus);
routes.post(
  "/updateprofilephoto",
  verifyToken,
  upload.single("edit-image"),
  updateProfilePhoto
);

export default routes;
