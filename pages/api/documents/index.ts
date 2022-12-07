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
    const existingGoal = await prisma.document.findUnique({
      where: {
        userId_subjectName: { userId: session?.sub!, subjectName: title },
      },
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

    const result = await prisma.document.create({
      data: {
        subjectName: title,
        user: { connect: { email: session!.email! } },
      },
    });
    res.status(201).json(result);
  }
}
