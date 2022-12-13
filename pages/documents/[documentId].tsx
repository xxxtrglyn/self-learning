import {
  Grid,
  Paper,
  Title,
  ScrollArea,
  Group,
  Stack,
  ThemeIcon,
  Text,
  Button,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconPlus, IconTool, IconMinus } from "@tabler/icons";
import NewLesson from "../../components/document/newlesson";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "../../store";
import {
  createNewLesson,
  deleteLesson,
  updateLesson,
} from "../../store/document-actions";
import Richtext from "../../components/richtext/richtext";
import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Document2 } from "../../types/document";
import LessonItem from "../../components/document/lessonitem";

const DetailDocument: NextPage = () => {
  const router = useRouter();
  const id = router.query["documentId"] as string;
  const lessons = useSelector((state: RootState) =>
    state.document.items.find((doc) => doc.id === id)
  )?.lessons;

  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [richValue, setRichValue] = useState<string>(
    lessons?.length ? lessons[selected].content! : ""
  );
  const dispatch = useAppDispatch();

  const addToSelectedListHandler = (id: string) => {
    const isExisted = selectedId.find((thisid) => thisid === id);
    if (isExisted) {
      setSelectedId((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedId((prev) => prev.concat(id));
    }
  };
  useEffect(() => {
    setSelectedId([]);
  }, [isDelete]);

  const list = lessons?.map((lesson, index) => (
    <LessonItem
      deleteMode={isDelete}
      key={lesson.id}
      lesson={lesson}
      index={index}
      onSelect={setSelected}
      onSet={setRichValue}
      onAdd={addToSelectedListHandler}
    />
  ));

  const createLessonHandler = (value: string) => {
    dispatch(createNewLesson({ id: id, label: value }));
  };
  return (
    <>
      <MainLayout order={6}>
        <Grid style={{ flex: 1, height: "100vh" }} m={0} p={0}>
          <Grid.Col span={9}>
            <Paper style={{ height: "100%" }}>
              <Group px={10}>
                <Title
                  align="center"
                  order={4}
                  weight={500}
                  py={10}
                  underline
                  style={{ flex: 1 }}
                >
                  {lessons?.length
                    ? lessons![selected].lessonName
                    : "No Lesson"}
                </Title>
                <IconTool
                  fill="black"
                  color="black"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </Group>

              {!isEdit ? (
                <ScrollArea style={{ height: "90vh" }} px={20}>
                  {lessons?.length ? (
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: lessons[selected].content!,
                      }}
                    ></Text>
                  ) : (
                    ""
                  )}
                </ScrollArea>
              ) : (
                <Stack>
                  <Richtext
                    style={{ height: "80vh" }}
                    value={richValue}
                    onChange={setRichValue}
                  />
                  <Button
                    onClick={() => {
                      if (richValue) {
                        dispatch(
                          updateLesson({
                            id: lessons![selected].id,
                            label: lessons![selected].lessonName,
                            content: richValue,
                          })
                        );
                        setIsEdit(false);
                      }
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              )}
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper shadow="sm" style={{ height: "100%" }} py={10}>
              <Title
                align="center"
                order={5}
                py={15}
                color={isDelete ? "red" : "black"}
              >
                {isDelete ? "Delete mode" : "Table of content"}
              </Title>
              <ScrollArea style={{ height: "80vh" }} px={15}>
                <Stack spacing={5}>{list}</Stack>
              </ScrollArea>
              {!isDelete ? (
                <Group position="right" px={10} py={6}>
                  <ThemeIcon
                    radius="xl"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsShowNewForm(true);
                    }}
                  >
                    <IconPlus />
                  </ThemeIcon>
                  <ThemeIcon
                    color="red"
                    radius="xl"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsDelete(true);
                    }}
                  >
                    <IconMinus />
                  </ThemeIcon>
                </Group>
              ) : (
                <Group position="center">
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => {
                      if (selectedId.length > 0) {
                        dispatch(deleteLesson({ id: id, list: selectedId }));
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    color="yellow"
                    onClick={() => {
                      setIsDelete(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Group>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </MainLayout>
      <NewLesson
        onCreate={createLessonHandler}
        opened={isShowNewForm}
        onClose={() => {
          setIsShowNewForm(false);
        }}
      />
    </>
  );
};

export default DetailDocument;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getToken({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   const id = context.query["documentId"] as string;
//   const document = await prisma.document.findUnique({
//     where: { id: id },
//     include: { lessons: true },
//   });
//   const transformDoc: Document2 = {
//     ...document!,
//     createdAt: document?.createdAt.toISOString(),
//     updatedAt: document?.updatedAt.toISOString(),
//     lessons: document?.lessons.map((lesson) => ({
//       ...lesson,
//       createdAt: lesson.createdAt.toISOString(),
//       updatedAt: lesson.updatedAt.toISOString(),
//     })),
//   };
//   return {
//     props: {
//       docs: transformDoc,
//     },
//   };
// };
