import { Card, createStyles, Space, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles(() => ({
  date: {
    position: "absolute",
    top: 10,
    right: 5,
  },
  card: {
    backgroundColor: "lightgoldenrodyellow",
    position: "relative",
    cursor: "pointer",
    "&::after": {
      content: '"."',
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "13px 13px 0 0",
      borderColor: "#736a6a #f8f9fa #f8f9fa #f8f9fa",
      zIndex: 20,
    },
  },
}));
const NoteItem: React.FC<{
  values: { id: number; userId: number; content: string };
  onSwitch: (data: string) => void;
}> = ({ values, onSwitch }) => {
  const { classes } = useStyles();
  const clickHandler = () => {
    onSwitch(values.content);
  };
  return (
    <>
      <Card className={classes.card} mb="sm" onClick={clickHandler}>
        <Text className={classes.date} size={10} weight={100}>
          Sep 14
        </Text>
        <Space h={7} />
        <Text size={14}>{values.content}</Text>
      </Card>
    </>
  );
};

export default NoteItem;
