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
  subject: "🔐 Your One-Time Code for Secure Login - Madly Mart",
  text: `Hello ${fullName},\n\nYour login code is: ${otp}\nPlease do not share this with anyone.\n\nThank you,\nMadly Mart`,
  html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
          
          <img src="https://madlymartadmin.vercel.app/MadlyMart.jpg" alt="Madly Mart" style="max-width: 180px; margin-bottom: 20px;" />
          
          <h2 style="color: #2c3e50;">Welcome to Madly Mart, ${fullName}!</h2>
          
          <p style="font-size: 16px; color: #555; margin: 15px 0;">
            Use the following login code to securely access your account:
          </p>
          
          <div style="background: #f4f6f9; border: 2px dashed #4cafef; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #1a73e8; font-size: 28px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="font-size: 14px; color: #e74c3c; font-style: italic; margin-bottom: 20px;">
            ⚠️ Please do not share this code with anyone.
          </p>
          
          <p style="font-size: 15px; color: #555;">
            Thank you for choosing <strong>Madly Mart</strong>.<br/>
            We’re glad to have you with us.
          </p>
          
          <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
          
          <p style="font-size: 13px; color: #888;">
            Best regards,<br/>
            <strong>The Madly Mart Team</strong>
          </p>
        </div>
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
