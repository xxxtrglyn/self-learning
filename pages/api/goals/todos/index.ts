import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req: req });
  if (!session) {
    res.status(401).json({ message: "Please login" });
    return;
  }

  if (req.method === "POST") {
    const data: { id: string; label: string } = req.body;
    if (!data) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await prisma.todo.create({
      data: {
        label: data.label,
        goal: { connect: { id: data.id } },
      },
    });

    if (result) {
      res.status(200).json(result);
      return;
    }
  }
}
