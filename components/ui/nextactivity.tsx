import {
  createStyles,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
  Center,
} from "@mantine/core";
import { Goal } from "../../types/goal";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    minHeight: "20vh",
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const StatsCard: React.FC<{ value: Goal[] | null }> = ({ value }) => {
  const { classes } = useStyles();
  const total = value?.length ? value[0]!.todos!.length : 0;
  const completed = value?.length
    ? value[0]!.todos!.filter((todo) => todo.isCompleted === true).length
    : 0;

  return (
    <>
      {value?.length ? (
        <Paper radius="md" withBorder className={classes.card}>
          <Text
            align="center"
            weight={700}
            className={classes.title}
            lineClamp={1}
          >
            {value[0].title}
          </Text>

          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Progress
            </Text>
            <Text size="sm" color="dimmed">
              {total == 0 ? 0 : (completed / total) * 100}%
            </Text>
          </Group>

          <Progress value={total == 0 ? 0 : (completed / total) * 100} mt={5} />

          <Group position="apart" mt="md">
            <Text size="sm">
              {completed} / {total} todos
            </Text>
            {new Date(value[0].end).getTime() + 86400000 - Date.now() >= 0 ? (
              <Badge size="sm">
                {Math.floor(
                  (new Date(value[0].end).getTime() + 86400000 - Date.now()) /
                    86400000
                )}{" "}
                days left
              </Badge>
            ) : (
              <Badge size="sm" color="red">
                {Math.floor(
                  (Date.now() - new Date(value[0].end).getTime() - 86400000) /
                    86400000
                )}{" "}
                days late
              </Badge>
            )}
          </Group>
        </Paper>
      ) : (
        <Paper
          radius="md"
          withBorder
          className={classes.card}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Center>
            <Text align="center">You has create no goal</Text>
          </Center>
        </Paper>
      )}
    </>
  );
};

export default StatsCard;
