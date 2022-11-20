import {
  createStyles,
  Grid,
  TextInput,
  Title,
  ThemeIcon,
  Space,
  Group,
} from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconSearch, IconPlus } from "@tabler/icons";
import NoteItem from "../../components/note/noteitem";
import RichTextEditor from "../../components/richtext/richtext";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { noteAction } from "../../store/note-slice";
import { Note } from "../../types/note";
import { createOrUpdateNote } from "../../store/note-actions";

const useStyles = createStyles(() => ({
  list: {},
}));

const Note: NextPage<{ allNotes: Note[] }> = ({ allNotes }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(noteAction.replaceNoteList(allNotes));
  }, [dispatch, allNotes]);

  const notes = useSelector((state: RootState) => state.note.items);
  const [newNotes, setNewNotes] = useState<Note[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string>();
  const [filterId, setFilterId] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { classes } = useStyles();

  const totalNotes = notes.concat(newNotes);

  const selectedNoteContent = totalNotes.find(
    (note) => note.id === selectedId
  )?.content;

  useEffect(() => {
    if (selectedNoteContent !== undefined) {
      setValue(selectedNoteContent);
    }
  }, [selectedNoteContent]);

  const switchHandler = (id: string) => {
    setSelectedId(id);
  };

  const createOrUpdateHandler = async (id: string) => {
    const isNewNote = newNotes.find((note) => note.id === id);
    if (selectedId === id) {
      if (isNewNote) {
        setNewNotes((preNotes) => preNotes.filter((note) => note.id !== id));
        setValue(undefined);
      }
      await dispatch(createOrUpdateNote({ id: id, content: value! }));
    }
  };

  const addNewSampleNoteHandler = () => {
    setNewNotes((prevNotes) => {
      return prevNotes.concat({
        id: `samplenoteid${prevNotes.length}`,
        content: "",
        userId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });
    setSelectedId(`samplenoteid${newNotes.length}`);
  };

  return (
    <MainLayout order={2}>
      <Grid p={0} m={0} style={{ flex: 1, height: "100vh" }}>
        <Grid.Col className={classes.list} span={3}>
          <Group position="apart">
            <Title order={3} weight={500} style={{ display: "inline-block" }}>
              Sticky Notes
            </Title>
            {searchInput === "" && (
              <IconPlus
                size={27}
                style={{ cursor: "pointer" }}
                onClick={addNewSampleNoteHandler}
              />
            )}
          </Group>
          <Space h="xs" />
          <TextInput
            placeholder="Search..."
            rightSection={
              <ThemeIcon radius="xl" color="violet" size={24}>
                <IconSearch size={16} />
              </ThemeIcon>
            }
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.currentTarget.value);
              setFilterId(
                totalNotes
                  .filter((note) =>
                    note.content.includes(event.currentTarget.value)
                  )
                  .map((note) => note.id)
              );
            }}
          />
          <Space h="xs" />
          {totalNotes
            .filter((note) => {
              if (searchInput === "") {
                return true;
              } else {
                return filterId.findIndex((id) => id === note.id) > -1;
              }
            })
            .map((item) => (
              <NoteItem
                key={item.id}
                values={item}
                onSwitch={switchHandler}
                onCreateOrUpdate={createOrUpdateHandler}
                isSelected={selectedId === item.id}
              />
            ))}
        </Grid.Col>
        <Grid.Col span={9}>
          <RichTextEditor
            value={value}
            onChange={setValue}
            styles={{ root: { height: "95vh", overflowY: "auto" } }}
          />
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const noteList = await prisma.note.findMany({
    where: {
      userId: token.sub,
    },
  });

  const transformNoteList = noteList.map((note) => {
    return {
      id: note.id,
      userId: note.userId,
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  });
  return {
    props: {
      allNotes: transformNoteList,
    },
  };
};

export default Note;
