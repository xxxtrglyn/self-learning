import React from "react";
import { Card } from "@mantine/core";
import { User } from "../../types/user";
import { Stack, Text } from "@mantine/core";
import Member from "./member";

const MemberList: React.FC<{ value: User[] }> = ({ value }) => {
  const list = value.map((member) => <Member key={member.id} value={member} />);
  return (
    <Stack style={{ height: "100%" }}>
      <Card shadow="sm">
        <Text align="center" weight={500}>
          MemberList
        </Text>
      </Card>
      <Card style={{ flex: 1 }} shadow="sm">
        {list}
      </Card>
    </Stack>
  );
};

export default MemberList;
