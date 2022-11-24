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
    const { name } = data;

    if (!name) {
      res.status(422).json({
        message:
          "Invalid input - title should also be at least 7 characters long.",
      });
      return;
    }
    const newRoom = await prisma.room.create({
      data: { roomName: name, totalUser: 0, admin: session.sub! },
    });

    const result = await prisma.user.update({
      where: { id: session.sub },
      data: {
        joinedRooms: {
          create: {
            room: { connect: { id: newRoom.id } },
            isActived: true,
          },
        },
      },
    });

    res.status(201).json(newRoom);
  }
  if (req.method === "GET") {
    const param = req.query;
    const id = param.id as string;
    if (id) {
      const result = await prisma.room.findUnique({ where: { id: id } });
      if (result) {
        res.status(201).json(result);
        return;
      } else {
        res.status(404).json({ message: "Room not found" });
        return;
      }
    }
    return;
  }

  if (req.method === "PATCH") {
    const { id } = req.body;
    const isJoin = req.query.join;
    if (isJoin) {
      const result = await prisma.user.update({
        where: { id: session.sub },
        data: {
          joinedRooms: {
            create: {
              room: { connect: { id: id } },
              isActived: true,
            },
          },
        },
      });
      if (result) {
        res.status(201).json(result);
        return;
      } else {
        res.status(404).json({ message: "error" });
      }
    }
  }
}
