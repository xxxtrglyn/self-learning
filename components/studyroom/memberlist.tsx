import React from "react";
import { Card } from "@mantine/core";
import { User } from "../../types/user";
import { Stack, Text, Group } from "@mantine/core";
import Member from "./member";
import Clock from "../ui/clock";

const RightPart: React.FC<{
  value: User[];
  learnTime: number;
}> = ({ value, learnTime }) => {
  const list = value.map((member) => <Member key={member.id} value={member} />);

  return (
    <Stack style={{ height: "100%" }}>
      <Card shadow="sm">
        <Text align="center" weight={500}>
          Member
        </Text>
      </Card>
      <Card style={{ flex: 1 }} shadow="sm">
        {list}
      </Card>
      <Card style={{ flex: 1 }} shadow="sm">
        <Group align="center" position="center" style={{ height: "100%" }}>
          {learnTime ? (
            <Clock value={learnTime} />
          ) : (
            <Text size={90} weight={300}>
              --:--
            </Text>
          )}
        </Group>
      </Card>
    </Stack>
  );
};

export default RightPart;
