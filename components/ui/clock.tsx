import React, { useState, useEffect } from "react";
import { Text } from "@mantine/core";

const Clock: React.FC<{ value: number; onReset: () => void }> = ({
  value,
  onReset,
}) => {
  const [minutes, setMinutes] = useState<number>(value ? value - 1 : 0);
  const [seconds, setSeconds] = useState<number>(value ? 59 : 0);
  if (!minutes && !seconds) {
    onReset();
  }
  useEffect(() => {
    const minus = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    if (!seconds) {
      if (minutes) {
        setMinutes((prev) => prev - 1);
      } else {
        clearInterval(minus);
      }
    }
    return () => {
      clearInterval(minus);
    };
  }, [seconds, minutes]);

  return (
    <Text size={90}>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

export default Clock;
