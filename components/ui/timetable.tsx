import React from "react";
import { Paper, Text, createStyles, Group, RingProgress } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Room } from "../../types/Room";
import { TimeControl } from "../../types/timecontrol";
import { Color } from "../../lib/color";
import { TransformDate } from "../../lib/transformdate";
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

const TimeTab: React.FC<{ values: TimeControl[] | null | undefined }> = ({
  values,
}) => {
  const { classes } = useStyles();
  const data: TimeControl | null = values ? values![0] : null;
  const defaultData = [{ value: 100, color: "#f1f3f5", tooltip: "nothing" }];
  const sectionData = data?.timeitems.map((item, index) => {
    const value = item.amount / (12 * 60);

    return {
      value: value * 100,
      color: Color[index],
      tooltip: item.description,
    };
  });

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title} lineClamp={1}>
        Timetable
      </Text>
      {values ? (
        <Group position="center">
          <RingProgress
            size={100}
            thickness={15}
            sections={sectionData ? sectionData : defaultData}
          />
        </Group>
      ) : (
        <Text align="center">There&apos;s no Timetable for today</Text>
      )}
    </Paper>
  );
};

export default TimeTab;
