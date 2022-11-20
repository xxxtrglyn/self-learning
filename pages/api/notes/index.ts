import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

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
    const data: { id: string; content: string } = req.body;

    const existingNote = await prisma.note.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!existingNote) {
      const result = await prisma.note.create({
        data: {
          content: data.content,
          user: { connect: { id: session.sub } },
        },
      });

      if (result) {
        res.status(200).json(result);
        return;
      }
    } else {
      const result = await prisma.note.update({
        where: { id: data.id },
        data: { content: data.content },
      });
      if (result) {
        res.status(200).json(result);
        return;
      }
    }
  }
}
