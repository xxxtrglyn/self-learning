import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../../types/next";
import MessageHandler from "../../../lib/socket/messageHandler";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
      });
      socket.on("setClock", (time: number, id: string) => {
        socket.to(id).emit("receiveClock", time);
      });
      MessageHandler(socket);
    });

    res.socket.server.io = io;
  }
  res.end();
}
