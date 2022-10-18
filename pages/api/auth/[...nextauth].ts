import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import type { User } from "@prisma/client";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        console.log(user);

        if (user) {
          const isValid = await verifyPassword(
            credentials!.password,
            user.password
          );
          if (isValid) {
            console.log("ok");

            return user;
          } else {
            throw new Error("Your password is incorrect");
          }
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
