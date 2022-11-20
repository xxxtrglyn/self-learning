import { Room } from "./Room";
import { User } from "./user";

export interface Message {
  id?: string;
  userId?: string;
  roomId?: string;
  createdAt?: string;
  user?: User;
  room?: Room;
  content: string;
}
