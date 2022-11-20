import React, { useState } from "react";
import { Grid, Card, Button, createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import TimeTableChart from "./timetablechart";
import { Timetable } from "../../types/timetable";

const useStyles = createStyles(() => ({
  card: {
    cursor: "pointer",
  },
  cardSelected: {
    cursor: "pointer",
    backgroundColor: "rgba(255,0,0,0.1)",
  },
}));

const TimeTableItem: React.FC<{
  value: Timetable;
  isDeleteMode: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ value, onAdd, onRemove, isDeleteMode }) => {
  const router = useRouter();
  const { classes } = useStyles();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const toggleSelectedHandler = () => {
    setIsSelected((prev) => !prev);
    if (!isSelected) {
      onAdd(value.id);
    } else {
      onRemove(value.id);
    }
  };

  return (
    <Grid.Col span={4}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        className={!isSelected ? classes.card : classes.cardSelected}
        onClick={
          isDeleteMode
            ? toggleSelectedHandler
            : () => {
                router.push(`timetables/${value.id}`);
              }
        }
      >
        <TimeTableChart id={value.id} />
        <Button>Set as default</Button>
      </Card>
    </Grid.Col>
  );
};

export default TimeTableItem;
