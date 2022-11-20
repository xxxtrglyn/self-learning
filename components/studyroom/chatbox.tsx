import React, { useState } from "react";
import {
  Stack,
  Group,
  createStyles,
  Title,
  Textarea,
  ThemeIcon,
  Button,
} from "@mantine/core";
import SingleMsg from "./singlemsg";
import { IconPhoto } from "@tabler/icons";
import { Message } from "../../types/message";

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

const ChatBox: React.FC<{ onSend: (message: Message) => void }> = ({
  onSend,
}) => {
  const { classes } = useStyles();
  const [msg, setMsg] = useState<string>("");

  return (
    <div className={classes.container}>
      <Group position="center" className={classes.header}>
        <Title order={2} weight={500} align="center" size="sm">
          The room name
        </Title>
      </Group>
      <div className={classes.box}>
        <Stack p={10}>
          <SingleMsg />
        </Stack>
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
          <Button onClick={onSend.bind(this, { content: msg })}>Send</Button>
        </Group>
      </div>
    </div>
  );
};

export default ChatBox;
