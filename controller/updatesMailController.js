const nodeMailer = require("nodemailer");
require("dotenv").config();

// creating mail controller
const updatesMailController = async (request, response) => {
  try {
    const { email, subject, html } = request.body;
    if (!email || !subject || !html) {
      return response
        .status(404)
        .json({ message: "required email subject and html content" });
    }

    // creating transporter
    const transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    return response
      .status(201)
      .json({ message: "email has sent successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = updatesMailController;
