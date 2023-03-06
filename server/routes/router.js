import express from "express";
import multer from "multer";
import {
  addTestimonial,
  changeApplyStatus,
  getJobDetails,
  getJobListing,
  getTestimonials,
  userLogin,
  userSignup,
} from "../controllers/amazonJob.js";

const routes = express.Router();

const upload = multer({ dest: "uploads/" });

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
routes.post("/addtestimonial", addTestimonial);
routes.get("/testimonials", getTestimonials);

export default routes;
