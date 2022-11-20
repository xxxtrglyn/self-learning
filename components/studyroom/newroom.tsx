import React from "react";
import { Card, createStyles } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

const useStyles = createStyles(() => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const NewRoom = () => {
  const { classes } = useStyles();
  return (
    <Card className={classes.card}>
      <IconPlus size="xl" />
    </Card>
  );
};

export default NewRoom;
