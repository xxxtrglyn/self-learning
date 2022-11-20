import { Button, createStyles, Paper, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { Room } from "../../types/Room";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    // width: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const RoomCard: React.FC<{ values: Room }> = ({ values }) => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url("https://randomc.net/image/86/86%20-%2022%20-%20Large%2023.jpg")`,
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          Category
        </Text>
        <Title order={3} className={classes.title}>
          {values.roomName}
        </Title>
      </div>
      <Button
        variant="white"
        color="dark"
        style={{ margin: "0 auto" }}
        onClick={() => {
          router.push(`/studyroom/${values.id}`);
        }}
      >
        Enter Room
      </Button>
    </Paper>
  );
};

export default RoomCard;
