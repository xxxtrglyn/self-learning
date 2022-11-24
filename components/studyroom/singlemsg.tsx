import React from "react";
import { Group, Avatar, Card, Text } from "@mantine/core";
import { Message } from "../../types/message";

const SingleMsg: React.FC<{ value: Message; left: boolean }> = ({
  value,
  left,
}) => {
  return (
    <>
      {!left ? (
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
      )}
    </>
  );
};

export default SingleMsg;
