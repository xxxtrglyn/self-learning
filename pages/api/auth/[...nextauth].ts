import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user!.role!;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          const isValid = await verifyPassword(
            credentials!.password,
            user.password
          );
          if (isValid) {
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
