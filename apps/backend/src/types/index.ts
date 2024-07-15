import { Request } from "express"
import { IUser } from "../models/User.model"

export type User = {
    name: string
    email: string
    user_type: UserType
    password: string
}
export enum UserType {
    USER = "USER",
    ADMIN = "ADMIN"
}

export type JwtExtendedRequest = Request & {
    user?: IUser
}