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
      moreDetail: string;
      startAt: string;
      endAt: string;
    } = req.body;
    if (!data) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await prisma.timeline.create({
      data: {
        moreDetail: data.moreDetail,
        startAt: data.startAt,
        endAt: data.endAt,
        timetable: { connect: { id: data.id } },
      },
    });

    if (result) {
      res.status(200).json(result);
      return;
    }
  }
}
