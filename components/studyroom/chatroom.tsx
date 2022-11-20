import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import ChatBox from "./chatbox";
import Player from "./player";
import MemberList from "./memberlist";
import { User } from "../../types/user";
import { io, Socket } from "socket.io-client";
import { Message } from "../../types/message";
import { BaseURL } from "../../lib/axiosinstance";

let socket: Socket;

const ChatRoom: React.FC<{ id: string; members: User[] }> = ({
  id,
  members,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await BaseURL.get("/api/socket");
    socket = io();
    console.log(socket);

    socket.on("newIncomingMessage", (msg: Message) => {
      setMessages((prev) => [...prev].concat(msg));
      console.log(msg);
    });
  };

  const sendMessage = async (message: Message) => {
    console.log(message);

    socket.emit("createdMessage", message);
    setMessages((prev) => [...prev].concat(message));
  };

  return (
    <Grid style={{ flex: 1 }} m={0} p={0}>
      <Grid.Col span={9}>
        <ChatBox onSend={sendMessage} />
      </Grid.Col>
      <Grid.Col span={3}>
        <MemberList value={members} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Player />
      </Grid.Col>
    </Grid>
  );
};

export default ChatRoom;
