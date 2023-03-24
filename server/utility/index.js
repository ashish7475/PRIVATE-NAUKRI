import nodemailer from "nodemailer";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import User from "../models/user.js";
import JobListing from "../models/JobListing.js";
import mongoose from "mongoose";
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

const contactUsEmail = (name, email, subject, message) => {
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
  const URI = process.env.URI;
  await mongoose.connect(URI);

  const users = await User.find({ notifications: true });
  const emails = users.map((user) => user.email);
  const jobs = await JobListing.find().limit(7).exec();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  emails.forEach((email) => {
    const mailOptions = {
      from: "private.naukri.ashish@gmail.com",
      to: email,
      subject: "Latest Jobs to check out",
      html: `<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        @import url('https://fonts.googleapis.com/css?family=Montserrat');

        * {
            box-sizing: border-box;

        }

        body {
            margin: 0;
            color:white;
        }

        table {
            background-color: #28223F;
            font-family: Montserrat, sans-serif;
            justify-content: center;
            margin: 0;
            height: 100%;
            width: 100%;

        }


 
        h3 {
            margin: 10px 0;
        }

        h6 {
            margin: 5px 0;
            text-transform: uppercase;
        }

        p {
            font-size: 14px;
            line-height: 21px;
        }

        .card-container {
            background-color: #231E39;
            border-radius: 5px;
            box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
            color: #B3B8CD;
            padding-top: 30px;
            position: relative;
            width: 350px;
            max-width: 100%;
            text-align: center;
            height: fit-content;
        }

        td {
            width: 350px !important;
        }

        .card-container .pro {
           
            background-color: #FEBB0B;
            border-radius: 3px;
            font-size: 14px;
            font-weight: bold;
            padding: 3px 7px;
            
          
        }

        .card-container .round {
            border: 1px solid #03BFCB;
            border-radius: 50%;
            padding: 7px;
        }

        button.primary {
            background-color: #03BFCB;
            border: 1px solid #03BFCB;
            border-radius: 3px;
            
            font-family: Montserrat, sans-serif;
            font-weight: 500;
            padding: 10px 25px;
        }
        .pro{
            color: black;

        }

        button.primary.ghost {
            background-color: transparent;
            color: #02899C;
        }

        .skills {
            background-color: #1F1A36;
            text-align: left;
            padding: 15px;
            margin-top: 30px;
        }

        .skills ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        .skills ul li {
            border: 1px solid #2D2747;
            border-radius: 2px;
            display: inline-block;
            font-size: 12px;
            margin: 0 7px 7px 0;
            padding: 7px;
        }

        footer {
            background-color: #222;
            color: #fff;
            font-size: 14px;
            bottom: 0;
            position: fixed;
            left: 0;
            right: 0;
            text-align: center;
            z-index: 999;
        }

        footer p {
            margin: 10px 0;
        }

        footer i {
            color: red;
        }

        footer a {
            color: #3c97bf;
            text-decoration: none;
        }

        .footer {
            width: 100%;
        }
        a,span{
            font-size: 1.2rem;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td>
                <table style="padding:20px;">
                    <tr>
                        <td>
                            <div class="card-container">
                                <span class="pro"> ID- ${jobs[1].jobId}</span>
                                <h3> ${jobs[1].title}</h3>
                                <h6>TYPE- ${jobs[1].type} | LOCATION- ${jobs[1].location}</h6>
                                <p>COMPANY- ${jobs[1].companyName} <br />STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[1].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="card-container">
                                <span class="pro">ID- ${jobs[2].jobId}</span>
                                <h3> ${jobs[2].title}</h3>
                                <h6>TYPE- ${jobs[2].type} | LOCATION- ${jobs[2].location}</h6>
                                <p>COMPANY- ${jobs[2].companyName} <br /> STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[2].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="card-container">
                                <span class="pro">ID- ${jobs[3].jobId}</span>
                                <h3> ${jobs[3].title}</h3>
                                <h6>TYPE- ${jobs[3].type} | LOCATION- ${jobs[3].location}</h6>
                                <p>COMPANY- ${jobs[3].companyName} <br /> STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[3].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="card-container">
                                <span class="pro">ID- ${jobs[4].jobId}</span>
                                <h3> ${jobs[4].title}</h3>
                                <h6>TYPE- ${jobs[4].type} | LOCATION- ${jobs[4].location}</h6>
                                <p>COMPANY- ${jobs[4].companyName} <br /> STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[4].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="card-container">
                                <span class="pro">ID- ${jobs[5].jobId}</span>
                                <h3>${jobs[5].title}</h3>
                                <h6>TYPE- ${jobs[5].type} | LOCATION- ${jobs[5].location}</h6>
                                <p>COMPANY- ${jobs[5].companyName} <br /> STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[5].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="card-container">
                                <span class="pro">ID- ${jobs[6].jobId}- ${jobs[6].jobId}</span>
                                <h3> ${jobs[6].title}</h3>
                                <h6>TYPE- ${jobs[6].type} | LOCATION- ${jobs[6].location}</h6>
                                <p>COMPANY- ${jobs[6].companyName} <br /> STATUS</p>
                                <div class="buttons">

                                    <a href="${jobs[6].applyUrl}">
                                        <button class="primary">
                                            Apply
                                        </button>
                                    </a>
                                    <a href="http://localhost:3000/home">
                                        <button class="primary ghost">
                                            Learn More
                                        </button>
                                    </a>
                                </div>
                                <div class="skills"><S></S>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <footer>
                    <table class="footer">
                        <tr>
                            <td>
                                <a target="_blank" href="https://forms.gle/pqs6zfrd7TUyPpCw7">Feedbacks</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a target="_blank" href="http://localhost:5000/unsubscribe/${email}">Unsubscribe</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Created with ❤️ by Ashish Kumar</span>
                            </td>
                        </tr>
                    </table>
                </footer>
            </td>
        </tr>

        </div>
</body>

</html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

export { sendWelcomeMail, sendResetEmail, contactUsEmail, jobListingsEmail };
