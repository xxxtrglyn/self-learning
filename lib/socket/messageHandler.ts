import { Socket } from "socket.io";
import { Message } from "../../types/message";

const MessageHandler = (socket: Socket) => {
  const createdMessage = (msg: Message, id: string) => {
    socket.to(id).emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);
};

export default MessageHandler;
