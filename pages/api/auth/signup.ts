import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password, fullname } = data;

  if (!email || !password || password.trim().length < 7) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      fullname: fullname,
      role: "user",
    },
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
