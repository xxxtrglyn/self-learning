import { Room } from "./Room";
import { User } from "./user";

export interface JoinedRoom {
  userId?: string;
  roomId?: string;
  room?: Room;
  user?: User;
  isActived?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}
