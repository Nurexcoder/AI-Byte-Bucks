import {  User } from "../../types";
import { encryptPassword } from "../../utils/helper";
import prisma from "../prisma.client";

export const addUser = async (user: User) => {
  if (!user) return;

  user.password = encryptPassword(user.password);
  return await prisma.user.create({ data: user });
};

export const findUserByEmail=(email:string)=>{
  return prisma.user.findUnique({where:{email}})
}