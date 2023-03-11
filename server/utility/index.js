import nodemailer from "nodemailer";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import User from "../models/user.js";
import AmazonJobListing from "../models/AmazonJobListing.js";
dotenv.config();

const sendWelcomeMail = (user) => {
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
      <p>Welcome ${user.name},</p>
      <p>Thank you for signing up for Private Naukri! We're excited to have you join our community and hope you'll find our app to be a valuable tool for your professional career.</p>
      <p>At Private Company, our mission is to help job seekers get placed at their dream companies. We believe our app can help you achieve your goals and make your life easier. Moreover, it can help you analyze yourself based on your performance at various opportunities provided by us.</p>
      <p>Please don't hesitate to reach out to us if you have any questions or feedback about the app. Our team is always happy to help. You can provide honest feedback and add testimonials based on your experience.</p>
      <p>Again, thank you for joining us, and we hope you enjoy using Private Naukri!</p>
      <p>Best regards,</p>
      <p>Ashish Kumar</p>
      <p>Founder and CEO, Private Naukri</p>
    </div>
    <div class="contact" style='margin-top: 1rem;
      font-style: italic;'>
      <p>If you have any questions or concerns, please visit our website or contact us directly.</p>
    </div>
    <div class="disclaimer" style="margin-top: 2rem;
      font-size: 14px;
      color: #999;">
      <p>Please do not reply to this email. This message is automatically generated and the mailbox is not monitored. If you have any questions or concerns, please visit our website or contact us directly. Thank you for your understanding.</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: "Private Naukri welcomes you!",
    html: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const sendResetEmail = (name, email, token) => {
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
    <h1>${name}</h1>
    <div class="message" style="margin-bottom: 1rem;">
     
<a 
 href='http://localhost:3000/resetpassword?token=${token}'
 class="button-30"
 style="font-size: 18px;text-align:'center';">Reset Password</a>
    </div>
    <div class="contact" style='margin-top: 1rem;
      font-style: italic;'>
      <p>If you have any questions or concerns, please visit our website or contact us directly.</p>
    </div>
    <div class="disclaimer" style="margin-top: 2rem;
      font-size: 14px;
      color: #999;">
      <p>Please do not reply to this email. This message is automatically generated and the mailbox is not monitored. If you have any questions or concerns, please visit our website or contact us directly. Thank you for your understanding.</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Reset Password",
    html: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const contactUsEmail = async (name, email, subject, message) => {
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

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `New message from ${name} - ${subject}`,
    html: `
<html>

<head>
    <title>New message from ${name}
    </title>
    <style type="text/css">
@media (max-width: 767px) {
  table {
    width: 100%;
    max-width: 600px;
  }
}
</style>
</head>

<body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #f2f2f2; margin: 0; padding: 0;">
    <table style="border-collapse: collapse; border-spacing: 0; width: 100%; margin: 0 auto;" width="100%">
        <tr>
            <th colspan="2" style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd; background-color: #f2f2f2;" align="left" valign="top" bgcolor="#f2f2f2">
                <h1>New message from ${name}
                </h1>
            </th>
        </tr>
        <tr>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top"><strong>Name:</strong></td>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top">
                ${name}
            </td>
        </tr>
        <tr>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top"><strong>Email:</strong></td>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top">
                ${email}
            </td>
        </tr>
        <tr>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top"><strong>Subject:</strong></td>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top">
                ${subject}
            </td>
        </tr>
        <tr>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top"><strong>Message:</strong></td>
            <td style="text-align: left; vertical-align: top; padding: 10px; border: 1px solid #dddddd;" align="left" valign="top">
                ${message}
            </td>
        </tr>
    </table>
</body>

</html>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const jobListingsEmail = async () => {
  const users = await User.find({ notifications: true });
  const emails = users.map((user) => user.email);
  const jobs = await AmazonJobListing.find().limit(6).exec();

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

<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Listings</title>
    <style type="text/css">
      /* Styles for the card component */
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 5px;
        width: 30%;
        margin: 20px auto;
      }
      
      .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
      
      .container {
        padding: 2px 16px;
      }
      
      /* Styles for the job listings */
      .job-title {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
      }
      
      .company-name {
        font-style: italic;
        font-size: 16px;
        margin-bottom: 10px;
      }
      
      .job-location {
        font-size: 16px;
        margin-bottom: 10px;
      }
      
      .job-description {
        font-size: 16px;
      }
    </style>
  </head>
  
  <body>
    <h1>Job Listings</h1>
    <span>Checkout the updated listings<span>
    
    
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[0].title}</h2>
          <p class="company-name"> ${jobs[0].companyName}</p>
          <p class="job-location"> ${jobs[0].location}</p>
          <p class="job-description"> ${jobs[0].jobId}</p>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[1].title}</h2>
          <p class="company-name"> ${jobs[1].companyName}</p>
          <p class="job-location"> ${jobs[1].location}</p>
          <p class="job-description"> ${jobs[1].jobId}</p>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[2].title}</h2>
          <p class="company-name"> ${jobs[2].companyName}</p>
          <p class="job-location"> ${jobs[2].location}</p>
          <p class="job-description"> ${jobs[2].jobId}</p>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[3].title}</h2>
          <p class="company-name"> ${jobs[3].companyName}</p>
          <p class="job-location"> ${jobs[3].location}</p>
          <p class="job-description"> ${jobs[3].jobId}</p>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[5].title}</h2>
          <p class="company-name"> ${jobs[5].companyName}</p>
          <p class="job-location"> ${jobs[5].location}</p>
          <p class="job-description"> ${jobs[5].jobId}</p>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h2 class="job-title"> ${jobs[4].title}</h2>
          <p class="company-name"> ${jobs[4].companyName}</p>
          <p class="job-location"> ${jobs[4].location}</p>
          <p class="job-description"> ${jobs[4].jobId}</p>
        </div>
      </div>
   
  </body>
</html>
`;
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: [...emails],
    subject: "Checkout the Updated Jobs",
    html: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export { sendWelcomeMail, sendResetEmail, contactUsEmail, jobListingsEmail };
