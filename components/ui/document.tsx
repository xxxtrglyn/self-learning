import React from "react";
import { Paper, Text, createStyles, Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Document2 as Document } from "../../types/document";
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

const DocumentSm: React.FC<{ values: Document[] | null | undefined }> = ({
  values,
}) => {
  const { classes } = useStyles();
  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title} lineClamp={1}>
        Document
      </Text>
      <Text align="center" pt={10}>
        You has {values ? values.length : "no"}{" "}
        <Text style={{ display: "inline" }} color="grape">
          Documents
        </Text>
      </Text>
      {values && values.length > 0 && (
        <Text align="center">
          Your last Document is{" "}
          <NextLink
            href={`/documents/${values![values?.length! - 1].id}`}
            style={{ display: "block" }}
          >
            <Button variant="outline">
              {values![values?.length! - 1].subjectName}
            </Button>
          </NextLink>
        </Text>
      )}
    </Paper>
  );
};

export default DocumentSm;
