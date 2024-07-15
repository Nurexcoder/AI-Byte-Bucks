import { Request, Response } from "express";
import { JwtExtendedRequest, UserType } from "../../types";
// import { addUser, findUserByEmail, sendMail } from "../../prisma/helpers/User";

import { generateOtp as generateOtpHelper } from "../../utils/redis/helper";
import {
  comparePassword,
  encryptPassword,
  generateJWTToken,
  sendMail,
} from "../../utils/helper";
import { addUser, findUserByEmail, getUserDetailsWithWallet } from "../../models/User.model";
import { ObjectId } from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, otp } = req.body;
    const isUserExist = await findUserByEmail(email);
    if (isUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const encryptedPassword = encryptPassword(password);
    await addUser({
      name,
      email,
      password: encryptedPassword,
      user_type: UserType.ADMIN,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const generateOtp = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const otp = await generateOtpHelper(email);

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to generate OTP" });
    }

    await sendMail(email, name, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (!comparePassword(password, user.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateJWTToken(user);

    res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getUserDetails = async (req: JwtExtendedRequest, res: Response) => {
  try {
    const userWithWallet = await getUserDetailsWithWallet(req.user?.['_id'] );

    res.status(200).json({ success: true, data: userWithWallet });
  } catch (error) {
    
  }
}