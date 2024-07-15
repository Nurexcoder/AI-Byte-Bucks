import { NextFunction, Request, Response } from "express";
import { verifyOtp } from "../../utils/redis/helper";
import jwt from 'jsonwebtoken';
import { findUserByEmail, findUserById } from "../../models/User.model";
import { JwtExtendedRequest } from "../../types";
import dotenv from "dotenv";

dotenv.config();

export const validateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const isOtpValid = await verifyOtp(email, otp);
    if (!isOtpValid)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const validateToken = async (req: JwtExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded)

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await findUserById((decoded as any).id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized at user" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}