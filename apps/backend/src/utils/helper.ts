import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

dotenv.config()
const saltRounds = Number(process.env.SALT_ROUNDS)
const salt = bcrypt.genSaltSync(saltRounds)
export const encryptPassword = (password: string) => {
   const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}
export const sendMail = async (email: string, name: string, otp: string) => {
    const hostEmail = process.env.HOST_EMAIL;
    const hostPass = process.env.HOST_PASS;
    console.log(hostEmail, hostPass);
    let mailTransporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: hostEmail,
          pass: hostPass,
        },
      })
    );
  
    let mailDetails = {
      from: hostEmail,
      to: email,
      subject: "Verify your email",
      text: `Hi ${name},
      Your OTP is ${otp}.
      `,
    };
  
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  };