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
  }

  if (req.method === "DELETE") {
    const id = req.query["noteid"] as string;
    const result = await prisma.note.delete({
      where: {
        id: id,
      },
    });
    if (result) {
      res.status(200).json(result);
    }
  }
}
