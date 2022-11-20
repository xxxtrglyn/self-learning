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
      moreDetail: string;
      startAt: string;
      endAt: string;
    } = req.body;

    const id = req.query.timelineId as string;

    if (!data.moreDetail) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await prisma.timeline.update({
      where: {
        id: id,
      },
      data: {
        moreDetail: data.moreDetail,
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
      },
    });

    if (result) {
      res.status(200).json(result);
    }
  }

  if (req.method === "DELETE") {
    const id = req.query["timelineId"] as string;

    const result = await prisma.timeline.delete({
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
