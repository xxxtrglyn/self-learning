import React, { useEffect, useState } from "react";
import { Card, Grid, Group, Tooltip, ActionIcon } from "@mantine/core";
import ChatBox from "./chatbox";
import Player from "./player";
import MemberList from "./memberlist";
import { User } from "../../types/user";
import { io, Socket } from "socket.io-client";
import { Message } from "../../types/message";
import {
  IconSettings,
  IconDoorExit,
  IconUsers,
  IconInfoCircle,
} from "@tabler/icons";

let socket: Socket;

const ChatRoom: React.FC<{
  id: string;
  members: User[];
  messagesList: Message[];
  roomName: string;
}> = ({ id, members, messagesList, roomName }) => {
  const [messages, setMessages] = useState<Message[]>(messagesList);

  useEffect(() => {
    console.log("is running");
    socket = io("http://localhost:3000", {
      path: "/api/socket",
    });
    socket.on("newIncomingMessage", (msg: Message) => {
      setMessages((prev) => [...prev].concat(msg));
      console.log("tin nhan toi", msg);
    });
    socket.on("connect", () => {
      socket.emit("join-room", id);
    });
    if (socket) {
      return () => {
        console.log("disconnected");
        socket.disconnect();
      };
    }
  }, [id]);

  const sendMessage = (message: Message) => {
    socket.emit("createdMessage", message, id);
    setMessages((prev) => [...prev].concat(message));
  };

  return (
    <Grid style={{ flex: 1 }} m={0} p={0}>
      <Grid.Col span={9}>
        <ChatBox onSend={sendMessage} value={messages} roomName={roomName} />
      </Grid.Col>
      <Grid.Col span={3}>
        <MemberList value={members} />
      </Grid.Col>
      <Grid.Col span={9}>
        <Player />
      </Grid.Col>
      <Grid.Col span={3}>
        <Card radius="sm" shadow="sm">
          <Group position="right">
            <Tooltip label="See member of this room" offset={-15}>
              <ActionIcon>
                <IconUsers style={{ cursor: "pointer" }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="See member of this room" offset={-15}>
              <ActionIcon>
                <IconSettings style={{ cursor: "pointer" }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="See member of this room" offset={-15}>
              <ActionIcon>
                <IconInfoCircle style={{ cursor: "pointer" }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Leave this room" offset={-15}>
              <ActionIcon>
                <IconDoorExit style={{ cursor: "pointer" }} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default ChatRoom;
