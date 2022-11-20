import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { User } from "../../../types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req: req });
  if (!session) {
    res.status(401).json({ message: "Please login" });
  }

  if (req.method !== "POST") {
    return;
  }
  const data: User = req.body;

  const result = await prisma.user.update({
    where: {
      id: session?.sub,
    },
    data: {
      fullname: data.fullname,
      phone: data.phone,
      dob: data.dob,
      city: data.city,
      job: data.job,
      quotes: data.quotes,
    },
  });

  if (result) {
    res.status(201).json(result);
  }
}
