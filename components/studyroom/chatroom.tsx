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
  IconBellSchool,
} from "@tabler/icons";
import NewStudyCase from "./newstudycase";
import axios from "axios";
import { FileWithPath } from "@mantine/dropzone";

let socket: Socket;

const ChatRoom: React.FC<{
  id: string;
  members: User[];
  messagesList: Message[];
  roomName: string;
}> = ({ id, members, messagesList, roomName }) => {
  const [messages, setMessages] = useState<Message[]>(messagesList);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const startLearn = (remainTime: number) => {
    setTime(remainTime);
  };

  useEffect(() => {
    socket = io("http://localhost:3000", {
      path: "/api/socket",
    });
    socket.on("newIncomingMessage", (msg: Message) => {
      setMessages((prev) => [...prev].concat(msg));
    });
    // socket.on("receive-images", (imageURL: string) => {

    // })
    socket.on("connect", () => {
      socket.emit("join-room", id);
    });
    if (socket) {
      return () => {
        socket.disconnect();
      };
    }
  }, [id]);

  const sendMessage = (message: Message) => {
    socket.emit("createdMessage", message, id);
    setMessages((prev) => [...prev].concat(message));
  };

  const saveImageToCloud = (file: File) => {
    const img = new FormData();
    img.append("file", file);
    img.append("upload_preset", "upload_from_room");
    img.append("cloud_name", "dvmih2q1y");
    axios
      .post("https://api.cloudinary.com/v1_1/dvmih2q1y/upload", img)
      .then((res) => {
        socket.emit("send-images", res.data.url, id);
        setMessages((prev) =>
          [...prev].concat({ content: res.data.url, type: "img" })
        );
      });
  };

  const sendMultipleImagesHandler = (files: FileWithPath[]) => {
    files.forEach((file) => {
      saveImageToCloud(file);
    });
  };

  return (
    <>
      <Grid style={{ flex: 1 }} m={0} p={0}>
        <Grid.Col span={9}>
          <ChatBox
            onSend={sendMessage}
            value={messages}
            roomName={roomName}
            onSendImage={sendMultipleImagesHandler}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <MemberList
            onResetClock={() => {
              setTime(0);
            }}
            learnTime={time}
            value={members}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Player />
        </Grid.Col>
        <Grid.Col span={3}>
          <Card radius="sm" shadow="sm">
            <Group position="right">
              <ActionIcon
                onClick={() => {
                  setIsShowNewForm(true);
                }}
              >
                <IconBellSchool />
              </ActionIcon>
              <Tooltip label="See member of this room" offset={-15}>
                <ActionIcon>
                  <IconUsers style={{ cursor: "pointer" }} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="For admin only" offset={-15}>
                <ActionIcon>
                  <IconSettings style={{ cursor: "pointer" }} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="See detail" offset={-15}>
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
      <NewStudyCase
        onStart={startLearn}
        opened={isShowNewForm}
        onClose={() => {
          setIsShowNewForm(false);
        }}
      />
    </>
  );
};

export default ChatRoom;
