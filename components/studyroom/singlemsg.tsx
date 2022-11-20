import React from "react";
import { Group, Avatar, Card, Text } from "@mantine/core";

const SingleMsg = () => {
  return (
    <Group>
      <Avatar
        radius="xl"
        src="https://i.pinimg.com/736x/c4/0f/fc/c40ffc3ce38f26ffa3ea72507e334e85.jpg"
        alt="user's avatar"
      />
      <Card radius="xl" p={12} style={{ backgroundColor: "#E4E6EB" }}>
        <Text>Chỉ anh và em đến khi già nữa chỉ say đắm em thôi</Text>
      </Card>
    </Group>
  );
};

export default SingleMsg;
