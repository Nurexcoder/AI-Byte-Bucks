import otpGenerator from "otp-generator";
import redisClient from "./config";
export const generateOtp = async (email: string) => {
  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const result = await redisClient.set(email, otp, "EX", 60 * 5);
    if (result === "OK") return otp;

    throw new Error("Failed to generate OTP");
  } catch (error) {
    console.log(error);

    throw new Error("Failed to generate OTP");
  }
};
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const result = await redisClient.get(email);
    if (result === otp) return true;
    throw new Error("Invalid OTP");
  } catch (error) {
    return false;
  }
};
