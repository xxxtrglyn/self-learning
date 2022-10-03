import { createStyles, Text, Card, RingProgress, Group } from "@mantine/core";
import { useState } from "react";
import DetailGoal from "./detailgoal";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

interface StatsRingCardProps {
  title: string;
  completed: number;
  total: number;
  list: {
    label: string;
    isCompleted: boolean;
  }[];
}

export default function GoalItem({
  title,
  completed,
  total,
  list,
}: StatsRingCardProps) {
  const { classes, theme } = useStyles();

  const [isShowGoalDetail, setIsShownGoalDetail] = useState<boolean>(false);
  const showGoalDetailHandler = () => {
    setIsShownGoalDetail(true);
  };
  const hideGoalDetailHandler = () => {
    setIsShownGoalDetail(false);
  };

  return (
    <>
      <Card
        withBorder
        p="xl"
        radius="md"
        className={classes.card}
        onClick={showGoalDetailHandler}
      >
        <div className={classes.inner}>
          <div>
            <Text size="xl" className={classes.label}>
              {title}
            </Text>
            <div>
              <Text className={classes.lead} mt={30}>
                {total}
              </Text>
              <Text size="xs" color="dimmed">
                Total
              </Text>
            </div>
            <Group mt="lg">
              <div>
                <Text className={classes.label}>{total - completed}</Text>
                <Text size="xs" color="dimmed">
                  Remaining
                </Text>
              </div>
              <div>
                <Text className={classes.label}>{completed}</Text>
                <Text size="xs" color="dimmed">
                  Completed
                </Text>
              </div>
            </Group>
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[
                { value: (completed / total) * 100, color: theme.primaryColor },
              ]}
              label={
                <div>
                  <Text
                    align="center"
                    size="lg"
                    className={classes.label}
                    sx={{ fontSize: 22 }}
                  >
                    {((completed / total) * 100).toFixed(0)}%
                  </Text>
                  <Text align="center" size="xs" color="dimmed">
                    Completed
                  </Text>
                </div>
              }
            />
          </div>
        </div>
      </Card>
      {
        <DetailGoal
          onClose={hideGoalDetailHandler}
          opened={isShowGoalDetail}
          data={list}
          label={title}
        />
      }
    </>
  );
}
