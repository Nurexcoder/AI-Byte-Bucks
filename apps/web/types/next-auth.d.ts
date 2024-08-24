// types/next-auth.d.ts
import NextAuth from "next-auth";
import { UserBase } from "../../../packages/types/dist/user";

declare module "next-auth" {
  interface User extends UserBase {
    access_token: string;
  }

  interface Session {
    user: CustomUser;
    accessToken: string;
  }

  interface JWT {
    // id: string;
    name: string;
    email: string;
    accessToken: string;
  }
}
