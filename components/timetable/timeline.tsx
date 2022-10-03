import { Timeline, Text } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons";
import React from "react";

const TimelineNow: React.FC<{
  data: {
    title: string;
    data: { title: string; time: string; info: string }[];
  };
}> = (props) => {
  return (
    <Timeline active={0} bulletSize={24} lineWidth={2}>
      {props.data.data.map((item) => (
        <Timeline.Item key={item.title} bullet={<IconCircleDashed size={12} />}>
          <Text weight="bold">{item.title}</Text>
          <Text color="dimmed" size="sm">
            {item.info}
          </Text>
          <Text size="xs" mt={4}>
            {item.time}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default TimelineNow;
