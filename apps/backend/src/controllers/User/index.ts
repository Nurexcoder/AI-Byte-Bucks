import { Request, Response } from "express";
import { UserType } from "../../types";
import { addUser, findUserByEmail } from "../../prisma/helpers/User";

import {generateOtp as generateOtpHelper} from "../../utils/redis/helper";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password,otp } = req.body;
    const isUserExist = await findUserByEmail(email);
    if (isUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }


    await addUser({ name, email, password, userType: UserType.ADMIN });
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
    const { email } = req.body;
    const otp = await generateOtpHelper(email);
    res.status(200).json({ success: true, otp });
  } catch (error) {}
};
