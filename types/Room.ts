import { JoinedRoom } from "@prisma/client";

export interface Room {
  id: string;
  roomName: string;
  totalUser?: number;
  coverImage?: string | null;
  admin: string;
  createdAt?: string;
  updatedAt?: string;
  joinrooms?: JoinedRoom;
}
