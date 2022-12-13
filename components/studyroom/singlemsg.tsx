import React from "react";
import { Group, Avatar, Card, Text, Image } from "@mantine/core";
import { Message } from "../../types/message";

const SingleMsg: React.FC<{ value: Message; left: boolean }> = ({
  value,
  left,
}) => {
  let msg;
  if (value.type === "normal") {
    msg = !left ? (
      <Group py={5} px={10}>
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
        <Card radius="xl" p={12} style={{ backgroundColor: "#E4E6EB" }}>
          <Text>{value.content}</Text>
        </Card>
      </Group>
    ) : (
      <Group position="right" py={5} px={10}>
        <Card radius="xl" p={12} style={{ backgroundColor: "#E4E6EB" }}>
          <Text>{value.content}</Text>
        </Card>
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
      </Group>
    );
  }

  if (value.type === "imgl" && !left) {
    msg = (
      <Group py={5} px={10}>
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
        <Image src={value.content} width="30vw" height="auto" alt="any photo" />
      </Group>
    );
  }
  if (value.type === "imgl" && left) {
    msg = (
      <Group py={5} px={10} position="right">
        <Image src={value.content} width="30vw" height="auto" alt="any photo" />
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
      </Group>
    );
  }
  if (value.type === "imgp" && !left) {
    msg = (
      <Group py={5} px={10}>
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
        <Image src={value.content} height="50vh" width="auto" alt="any photo" />
      </Group>
    );
  }
  if (value.type === "imgp" && left) {
    msg = (
      <Group py={5} px={10} position="right">
        <Image src={value.content} height="50vh" width="auto" alt="any photo" />
        <Avatar radius="xl" src={value.user?.avatar} alt="user's avatar" />
      </Group>
    );
  }
  return <>{msg}</>;
};

export default SingleMsg;
