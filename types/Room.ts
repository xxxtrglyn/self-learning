export interface Room {
  id: string;
  roomName: string;
  totalUser?: number;
  coverImage?: string | null;
  admin: string;
  createdAt?: string;
  updatedAt?: string;
}
