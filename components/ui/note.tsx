import React from "react";
import { Paper, Text, createStyles, Tooltip, ActionIcon } from "@mantine/core";
import { IconNote } from "@tabler/icons";
import { Note } from "../../types/note";
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

const strip = (value: string) => {
  let strippedString = value.replace(/(<([^>]+)>)/gi, "");
  return strippedString.slice(0, 30);
};

const Note: React.FC<{ values: Note[] | null | undefined }> = ({ values }) => {
  const { classes } = useStyles();
  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title} lineClamp={1}>
        Study Note
      </Text>
      <Text align="center" pt={10}>
        You has {values ? values.length : "no"}{" "}
        <Text style={{ display: "inline" }} color="yellow">
          Notes
        </Text>
      </Text>
      {values && values.length > 0 && (
        <Text align="center">
          Your last Note is{" "}
          <Tooltip label={strip(values.at(-1)?.content!)}>
            <ActionIcon style={{ display: "inline" }}>
              <IconNote
                size={18}
                color="yellow"
                style={{ cursor: "pointer" }}
              />
            </ActionIcon>
          </Tooltip>
        </Text>
      )}
    </Paper>
  );
};

export default Note;
