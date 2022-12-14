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
    const data: {
      id: string;
      description: string;
      amount: number;
      documentId: string;
    } = req.body;
    if (!data) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await prisma.timeItem.create({
      data: {
        description: data.description,
        amount: data.amount,
        timeControl: { connect: { id: data.id } },
        document: { connect: { id: data.documentId } },
      },
    });

    if (result) {
      res.status(200).json(result);
      return;
    }
  }
  if (req.method === "PATCH") {
    const data: {
      id: string;
      description: string;
      amount: number;
    } = req.body;
    if (!data) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await prisma.timeItem.update({
      where: {
        id: data.id,
      },
      data: {
        description: data.description,
        amount: data.amount,
      },
    });

    if (result) {
      res.status(200).json(result);
      return;
    }
  }
}
