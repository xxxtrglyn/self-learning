import { createStyles, Text, Card, RingProgress, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { Todo } from "../../types/todo";
import DetailGoal from "./detailgoal";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
  },
  cardInvalid: {
    backgroundColor: "rgba(255,0,0,0.1)",
    cursor: "pointer",
  },
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },
  label2: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  id: string;
  label: string;
  list: Todo[];
  deleteMode: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function GoalItem({
  id,
  label,
  list,
  deleteMode,
  onAdd,
  onRemove,
}: StatsRingCardProps) {
  const { classes, theme } = useStyles();
  const total = list.length;
  const completed = list.filter((todo) => todo.isCompleted === true).length;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [isShowGoalDetail, setIsShownGoalDetail] = useState<boolean>(false);
  const showGoalDetailHandler = () => {
    setIsShownGoalDetail(true);
  };
  const hideGoalDetailHandler = () => {
    setIsShownGoalDetail(false);
  };

  const toggleSelectedHandler = () => {
    setIsSelected((prev) => !prev);
    if (!isSelected) {
      onAdd(id);
    } else {
      onRemove(id);
    }
  };

  useEffect(() => {
    if (!deleteMode) {
      setIsSelected(false);
    }
  }, [deleteMode]);

  return (
    <>
      <Card
        withBorder
        p="xl"
        radius="md"
        className={isSelected ? classes.cardInvalid : classes.card}
        onClick={deleteMode ? toggleSelectedHandler : showGoalDetailHandler}
      >
        <div className={classes.inner}>
          <div>
            <Text size="xl" className={classes.label2}>
              {label}
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
                {
                  value: total == 0 ? 0 : (completed / total) * 100,
                  color: theme.primaryColor,
                },
              ]}
              label={
                <div>
                  <Text
                    align="center"
                    size="lg"
                    className={classes.label}
                    sx={{ fontSize: 22 }}
                  >
                    {total == 0 ? "0" : ((completed / total) * 100).toFixed(0)}%
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
          id={id}
          label={label}
          list={list}
        />
      }
    </>
  );
}
