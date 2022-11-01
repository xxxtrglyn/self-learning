import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { title } from "process";
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

  if (req.method === "PATCH") {
    const data: {
      title: string;
    } = req.body;

    const id = req.query.goalid as string;
    console.log(data.title);

    if (!data.title) {
      res.status(400).json({ message: "Invalid title" });
      return;
    }

    const result = await prisma.goal.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
      },
    });

    if (result) {
      res.status(200).json(result);
    }
  }
}
