import AmazonJobListing from "../models/AmazonJobListing.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Testimonial from "../models/Testimonials.js";

const getJobListing = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const page = parseInt(req.query.page) || 1;

    const type = req.query.filters.type;
    const companies = req.query.filters.companies;
    const countries = req.query.filters?.countries || [];
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

    const totalListings = await AmazonJobListing.find(query).count();

    const listings = await AmazonJobListing.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();
    res.status(200).json({ data: [...listings], totalListings });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const jobId = req.query.jobId;

    const job = await AmazonJobListing.findOne({ jobId });

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
  }
};
const changeApplyStatus = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    console.log(jobId);
    await AmazonJobListing.updateOne({ jobId }, { applied: true });
    res.send("Applied Status Changed Successfully");
  } catch (error) {
    console.log(error);
  }
};

const userSignup = async (req, res) => {
  const { name, username, email, password } = req.body;
  const { path } = req.file;

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

    res
      .status(200)
      .json({ message: "User Registered Successfully!", status: 200 });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  console.log(user);

  if (!user) {
    res.send({ message: "User not registered !", status: "error" });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      console.log(token);
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

const addTestimonial = async (req, res) => {
  try {
    const { username, name, photoUrl, testimonial, title } = req.body;
    console.log(req.body);
    const newTestimonial = await Testimonial.create({
      username,
      title,
      name,
      photoUrl,
      testimonial,
    });
    res
      .status(200)
      .json({ message: "Testimonial Added Successfully", status: "ok" });
  } catch (error) {
    res.json({ message: error, status: "error" });
  }
};
const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();

  res.status(200).json(testimonials);
};

export {
  getJobListing,
  getJobDetails,
  changeApplyStatus,
  userLogin,
  userSignup,
  addTestimonial,
  getTestimonials,
};
