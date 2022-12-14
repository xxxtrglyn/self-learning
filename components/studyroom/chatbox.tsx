import React, { useState } from "react";
import {
  Stack,
  Group,
  createStyles,
  Title,
  Textarea,
  ThemeIcon,
  Button,
  ScrollArea,
  Image,
} from "@mantine/core";
import SingleMsg from "./singlemsg";
import { IconPhoto } from "@tabler/icons";
import { Message } from "../../types/message";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useSession } from "next-auth/react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { User } from "../../types/user";

const useStyles = createStyles(() => ({
  container: {
    height: "85vh",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
  },
  header: {
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    padding: 20,
    flex: 0,
  },
  textarea: {
    marginTop: "auto",
    height: "10vh",
    overflow: "hidden",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 10,
  },
  ani: {
    transition: "all 0.2s linear",
  },
}));

const ChatBox: React.FC<{
  roomName: string;
  value: Message[];
  onSend: (message: Message) => void;
  onSendImage: (files: FileWithPath[], user: User) => void;
}> = ({ onSend, value, roomName, onSendImage }) => {
  const { classes } = useStyles();
  const session = useSession();
  const [msg, setMsg] = useState<string>("");
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        height="50px"
        width="50px"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt="preview"
      />
    );
  });

  const allMessage = value.map((message, index) => (
    <SingleMsg
      left={session.data?.user?.email === message.user?.email}
      key={message.id ? message.id : `message.user?.id${index}`}
      value={message}
    />
  ));
  const user = useSelector((state: RootState) => state.auth.info);
  return (
    <div className={classes.container}>
      <Group position="center" className={classes.header}>
        <Title order={2} weight={500} align="center" size="sm">
          {roomName}
        </Title>
      </Group>
      <div className={classes.box}>
        <ScrollArea style={{ height: "65vh" }} p={10}>
          {allMessage}
        </ScrollArea>
        <Group className={classes.textarea} position="right">
          <ScrollArea
            style={{
              maxHeight: "10vh",
              width: "30%",
            }}
          >
            <Group noWrap position="right">
              {previews}
            </Group>
          </ScrollArea>
          <Dropzone
            onDrop={(files) => setFiles(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            styles={{
              inner: { display: "flex", alignItems: "center" },
            }}
            sx={() => ({ border: 0, padding: 3 })}
          >
            <IconPhoto />
          </Dropzone>

          <Textarea
            variant="filled"
            radius="xl"
            minRows={1}
            autosize
            placeholder="Aa"
            className={classes.ani}
            value={msg}
            onChange={(event) => {
              setMsg(event.currentTarget.value);
            }}
            style={msg ? { width: "50%" } : { width: "20%" }}
          />
          <Button
            onClick={() => {
              if (msg) {
                if (files) {
                  onSend({ content: msg, user: user!, type: "normal" });
                  onSendImage(files, user!);
                } else {
                  onSend({ content: msg, user: user!, type: "normal" });
                }

                setMsg("");
              } else {
                if (files && !msg) {
                  onSendImage(files, user!);
                  setFiles([]);
                }
              }
            }}
          >
            Send
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default ChatBox;
