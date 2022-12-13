import React from "react";
import { Text } from "@mantine/core";

const Clock: React.FC<{ value: number }> = ({ value }) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return (
    <Text size={90}>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

export default Clock;
