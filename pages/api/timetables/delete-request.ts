import { NextApiRequest, NextApiResponse } from "next";
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
    const data: string[] = req.body;
    console.log(data);

    const deleteTimeline = prisma.timeline.deleteMany({
      where: {
        timeTableId: {
          in: data,
        },
      },
    });

    const deleteTimetable = prisma.timeTable.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });
    const transaction = await prisma.$transaction([
      deleteTimeline,
      deleteTimetable,
    ]);
    if (transaction) {
      res.status(200).json({ message: "Deleted" });
      return;
    }
  }
}
