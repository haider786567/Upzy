import nodemailer from "nodemailer";
import config from "./config.js";
const transporter = nodemailer.createTransport({
  host: "142.250.183.108", // Gmail IPv4
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS
  },
  tls: {
    servername: "smtp.gmail.com"
  }
});