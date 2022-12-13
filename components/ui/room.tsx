import React from "react";
import { Paper, Text, createStyles, Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Room } from "../../types/Room";
const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    minHeight: "20vh",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const Room: React.FC<{ values: Room[] | null | undefined }> = ({ values }) => {
  const { classes } = useStyles();
  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title} lineClamp={1}>
        Study Room
      </Text>
      <Text align="center" pt={10}>
        You has joined {values ? values.length : "no"} rooms
      </Text>
      {values && values.length > 0 && (
        <Text align="center">
          Your last room is{" "}
          <NextLink
            href={`/studyroom/${values![values?.length! - 1].id}`}
            style={{ display: "block" }}
          >
            <Button variant="outline">
              {values![values?.length! - 1].roomName}
            </Button>
          </NextLink>
        </Text>
      )}
    </Paper>
  );
};

export default Room;
