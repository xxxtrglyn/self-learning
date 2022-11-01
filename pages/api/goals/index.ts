import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req: req });
  if (!session) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  if (req.method === "POST") {
    const data = req.body;
    const { title } = data;
    const existingGoal = await prisma.goal.findUnique({
      where: { userId_title: { userId: session?.sub!, title: title } },
    });

    if (!title) {
      res.status(422).json({
        message:
          "Invalid input - title should also be at least 7 characters long.",
      });
      return;
    }

    if (existingGoal) {
      res.status(422).json({ message: "Title exists already!" });
      return;
    }

    const result = await prisma.goal.create({
      data: {
        title: title,
        user: { connect: { email: session!.email! } },
      },
    });
    res.status(201).json(result);
  }
}
