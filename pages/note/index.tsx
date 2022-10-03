import {
  createStyles,
  Grid,
  TextInput,
  Title,
  ThemeIcon,
  Space,
} from "@mantine/core";
import React, { useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconSearch } from "@tabler/icons";
import NoteItem from "../../components/note/noteitem";
import RichTextEditor from "../../components/richtext/richtext";

const useStyles = createStyles(() => ({
  list: {},
}));

const Note = () => {
  const [value, setValue] = useState<string>("i get my head out of sunroof");
  const { classes } = useStyles();

  return (
    <MainLayout>
      <Grid p={0} m={0} style={{ flex: 1, height: "100vh" }}>
        <Grid.Col className={classes.list} span={3}>
          <Title order={3} weight={500}>
            Sticky Notes
          </Title>
          <Space h="xs" />
          <TextInput
            placeholder="Search..."
            rightSection={
              <ThemeIcon radius="xl" color="violet" size={24}>
                <IconSearch size={16} />
              </ThemeIcon>
            }
          />
          <Space h="xs" />
          <NoteItem />
        </Grid.Col>
        <Grid.Col span={9}>
          <RichTextEditor
            value={value}
            onChange={setValue}
            styles={{ root: { height: "95vh" } }}
          />
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export default Note;
