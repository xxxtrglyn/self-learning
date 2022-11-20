import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import { User } from "../../../types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req: req });
  if (!session) {
    res.status(401).json({ message: "Please login" });
    return;
  }

  if (req.method !== "POST") {
    return;
  }
  const data: { password: string; newPassword: string } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      id: session?.sub,
    },
  });

  const isVerified = await verifyPassword(
    data.password,
    existingUser?.password!
  );
  if (!isVerified) {
    res.status(400).json({ message: "Wrong password" });
    return;
  }

  const hashedPassword = await hashPassword(data.newPassword);
  const result = await prisma.user.update({
    where: {
      id: session?.sub,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (result) {
    res.status(201).json(result);
    return;
  }
}
