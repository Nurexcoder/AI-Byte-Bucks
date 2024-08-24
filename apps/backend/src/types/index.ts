import { Request } from "express";
import { IUser } from "../models/User.model";
import { UserBase } from "@repo/types";

export type User = UserBase & {
  password: string;
};
export  enum UserType {
    USER = "USER",
    ADMIN = "ADMIN"
}
  



export type JwtExtendedRequest = Request & {
  user?: IUser;
};
