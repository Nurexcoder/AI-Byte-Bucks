import { NextFunction, Request, Response } from "express";
import { verifyOtp } from "../../utils/redis/helper";

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
