import mongoose from "mongoose";
import AmazonJobListing from "./models/AmazonJobListing.js";
import ApplyHistory from "./models/ApplyHistory.js";
import Testimonial from "./models/Testimonials.js";
import nodemailer from "nodemailer";
import PasswordResetToken from "./models/PasswordResetToken.js";
import User from "./models/user.js";
import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const URI = `mongodb+srv://ashish729912:hQAIMkyrifmhQH8w@webscrapercluster.sagxtxf.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected");
  });
// const query = {
//   title: { $regex: "", $options: "i" },
// };

// query.type = "Internship";

// await Testimonial.deleteMany();

// const sendWelcomeMail = () => {
//   const user = {
//     email: "ashish729912@gmail.com",
//     name: "Ashish Kumar",
//   };
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "private.naukri.ashish@gmail.com",
//       pass: "jwcddrxyemusqaut",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   const message = `
//     <html lang="en">
// <body style='font-family: Arial, sans-serif;
//       font-size: 16px;
//       line-height: 1.5;' >
//   <div class="container" style=' max-width: 800px;
//       margin: 0 auto;'>
//     <h1>Private Naukri</h1>
//     <div class="message" style="margin-bottom: 1rem;">
//       <p>Dear ${user.name},</p>
//       <p>Thank you for signing up for Private Naukri! We're excited to have you join our community and hope you'll find our app to be a valuable tool for your professional career.</p>
//       <p>At Private Company, our mission is to help job seekers get placed at their dream companies. We believe our app can help you achieve your goals and make your life easier. Moreover, it can help you analyze yourself based on your performance at various opportunities provided by us.</p>
//       <p>Please don't hesitate to reach out to us if you have any questions or feedback about the app. Our team is always happy to help. You can provide honest feedback and add testimonials based on your experience.</p>
//       <p>Again, thank you for joining us, and we hope you enjoy using Private Naukri!</p>
//       <p>Best regards,</p>
//       <p>Ashish Kumar</p>
//       <p>Founder and CEO, Private Naukri</p>
//     </div>
//     <div class="contact" style='margin-top: 1rem;
//       font-style: italic;'>
//       <p>If you have any questions or concerns, please visit our website or contact us directly.</p>
//     </div>
//     <div class="disclaimer" style="margin-top: 2rem;
//       font-size: 14px;
//       color: #999;">
//       <p>Please do not reply to this email. This message is automatically generated and the mailbox is not monitored. If you have any questions or concerns, please visit our website or contact us directly. Thank you for your understanding.</p>
//     </div>
//   </div>
// </body>
// </html>
//   `;
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: user.email,
//     subject: "Private Naukri welcomes you!",
//     html: message,
//   };
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };
// sendWelcomeMail();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

const jobs = await AmazonJobListing.find().limit(6).exec();

var mailOptions = {
  from: "private.naukri.ashish@gmail.com",
  to: "ashish729912@gmail.com",
  subject: "Sending Email using Node.js",
  template: "email",
  context: {
    title: "Title Here",
    text: "Lorem ipsum dolor sit amet, consectetur...",
  },
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
