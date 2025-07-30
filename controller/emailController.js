const nodeMailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRETKEY;

let otpStore = {};

// creating login otp controller
const sendMail = async (request, response) => {
  try {
    const { email, fullName } = request.body;
    if (!email) {
      return response.status(404).json({ message: "required credentials" });
    }
    // Nodemailer transporter
    const transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT) || 587, 
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // generating 6 digits otp
    const otp = crypto.randomInt(100000, 999999);
    otpStore[email] = otp;

    // mailOptions
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your One-Time Code for Secure Login",
      text: `Hello ${fullName},\n\nYour login code is: ${otp}\nPlease do not share this with anyone.`,
      html: `
        <html>
          <body>
            <h2>Welcome to Dora A-Z Fresh!</h2>
            <p>Dear ${fullName},</p>
            <p>Your Login code for logging in to your Madly Mart account is: <h3>${otp}</h3></p>
            <p><em>Please do not share this Login code with anyone.</em></p>
            <p>Thank you for choosing Madly Mart</p>
            <p>Best regards,<br />The Madly Mart</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return response
      .status(201)
      .json({ message: "Login otp sent successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "internal server error", error });
  }
};

// verifying login otp and saving credentials in databse
const verifyOtp = async (request, response) => {
  try {
    const { email, fullName, otp } = request.body;
    if (!email || !otp || !fullName) {
      return response.status(400).send("Email and login code are required");
    }

    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
      delete otpStore[email];

      // checking user in database
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        const defaultValue = "user";
        const newUser = new User({
          fullName,
          email,
          role: defaultValue,
        });

        // saving user Credentials if new user in db
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id }, secretKey);
        return response
          .status(200)
          .json({ message: "Login code verified successful", token });
      } else if (foundUser) {
        // generating jwt if user already logged in
        const token = jwt.sign({ userId: foundUser._id }, secretKey);
        return response
          .status(200)
          .json({ message: "Login code verified successful", token });
      }
    } else {
      return response.status(401).json({ message: "Login code is Invalid" });
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { sendMail, verifyOtp };
