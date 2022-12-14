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
    const { date } = data;

    const result = await prisma.timeControl.create({
      data: {
        date: date,
        user: { connect: { email: session!.email! } },
      },
    });
    res.status(201).json(result);
  }

  if (req.method === "DELETE") {
    const id = req.query["id"] as string;
    const result = await prisma.timeControl.delete({ where: { id: id } });
    if (!result) {
      res.status(401).json({ message: "delete error" });
    } else {
      res.status(200).json(result);
    }
  }
}
