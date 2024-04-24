import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserType } from "../../types";
import { addUser, findUserByEmail } from "../../prisma/helpers/User";

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const isUserExist = await findUserByEmail(email);
  if (isUserExist) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }
  await addUser({ name, email, password, userType: UserType.ADMIN });
  res.status(201).json({ success: true, message: "User created successfully" });
};
