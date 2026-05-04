import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  family: 4 // 🔥 force IPv4 (fixes your error)
});

export default transporter;