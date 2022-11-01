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

  if (req.method === "PATCH") {
    const data: {
      label: string;
      isCompleted: boolean;
    } = req.body;

    const id = req.query.todoid as string;

    if (!data.label) {
      res.status(400).json({ message: "Invalid label" });
      return;
    }

    const result = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        label: data.label,
        isCompleted: data.isCompleted,
      },
    });

    if (result) {
      res.status(200).json(result);
    }
  }

  if (req.method === "DELETE") {
    const id = req.query["todoid"] as string;

    const result = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    if (result) {
      res.status(200).json(result);
      return;
    }
  }
}
