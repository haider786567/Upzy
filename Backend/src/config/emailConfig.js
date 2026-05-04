import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "142.250.183.108", // Gmail IPv4
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    servername: "smtp.gmail.com"
  }
});