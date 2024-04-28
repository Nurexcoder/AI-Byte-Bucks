import { User } from "../../types";
import { encryptPassword } from "../../utils/helper";
import prisma from "../prisma.client";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (user: User) => {
  if (!user) return;

  user.password = encryptPassword(user.password);
  return await prisma.user.create({ data: user });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

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
