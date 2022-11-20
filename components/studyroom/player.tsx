import React from "react";

import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  container: {
    height: "85vh",
  },
  player: {
    width: "100%",
  },
}));

const Player = () => {
  const { classes } = useStyles();
  return <audio className={classes.player} controls></audio>;
};

export default Player;
