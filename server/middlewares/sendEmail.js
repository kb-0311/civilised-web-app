const nodeMailer = require("nodemailer");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
exports.sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8975ee8dc5df9b",
      pass: "04c1dff9686e5e"
    }
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};