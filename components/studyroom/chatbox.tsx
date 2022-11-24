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
} from "@mantine/core";
import SingleMsg from "./singlemsg";
import { IconPhoto } from "@tabler/icons";
import { Message } from "../../types/message";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useSession } from "next-auth/react";

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
}> = ({ onSend, value, roomName }) => {
  const { classes } = useStyles();
  const session = useSession();

  const [msg, setMsg] = useState<string>("");
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
          <ThemeIcon radius="xl">
            <IconPhoto />
          </ThemeIcon>
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
            style={msg ? { flex: 1 } : {}}
          />
          <Button
            onClick={() => {
              if (msg) {
                onSend({ content: msg, user: user! });
                setMsg("");
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
