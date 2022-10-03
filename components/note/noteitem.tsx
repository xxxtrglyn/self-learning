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
const NoteItem = () => {
  const { classes } = useStyles();
  return (
    <>
      <Card className={classes.card} mb="sm">
        <Text className={classes.date} size={10} weight={100}>
          Sep 14
        </Text>
        <Space h={7} />
        <Text size={14}>
          Đây là note dùng để lưu lại những note cần note lại, có thể lưu lại
          hoặc không lưu lại :))
        </Text>
      </Card>
      <Card className={classes.card} mb="sm">
        <Text className={classes.date} size={10} weight={100}>
          Sep 14
        </Text>
        <Space h={7} />
        <Text size={14}>
          Đây là note dùng để lưu lại những note cần note lại, có thể lưu lại
          hoặc không lưu lại :))
        </Text>
      </Card>
      <Card className={classes.card} mb="sm">
        <Text className={classes.date} size={10} weight={100}>
          Sep 14
        </Text>
        <Space h={7} />
        <Text size={14}>
          Đây là note dùng để lưu lại những note cần note lại, có thể lưu lại
          hoặc không lưu lại :))
        </Text>
      </Card>
    </>
  );
};

export default NoteItem;
