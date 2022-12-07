import React from "react";
import { Group, Avatar, Text } from "@mantine/core";
import { User } from "../../types/user";
import { IconDots } from "@tabler/icons";

const Member: React.FC<{ value: User }> = ({ value }) => {
  return (
    <Group p={5}>
      <Avatar
        src={value.avatar}
        alt="user's avatar"
        radius="xl"
        style={{ boxShadow: "0 0 1px 5px rgba(0,0,0,0.1)" }}
      />
      <div style={{ flex: 1 }}>
        <Text weight={500}>{value.fullname}</Text>
        <Text>{value.job}</Text>
      </div>
      <IconDots />
    </Group>
  );
};

export default Member;
