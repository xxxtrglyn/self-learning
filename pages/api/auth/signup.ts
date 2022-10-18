import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { username, password } = data;

  if (!username || !password || password.trim().length < 7) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
