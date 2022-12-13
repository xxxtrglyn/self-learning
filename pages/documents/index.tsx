import { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import styled from "@emotion/styled";
import {
  Center,
  Card,
  Badge,
  Text,
  createStyles,
  SimpleGrid,
  Group,
  Button,
  ScrollArea,
  Stack,
} from "@mantine/core";
import NewDocument from "../../components/document/newdocument";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Document2 } from "../../types/document";
import DocsList from "../../components/document/docslist";
import { useAppDispatch } from "../../store";
import { documentActions } from "../../store/document-slice";
interface DeleteDocument {
  delete(): void;
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: "20vh",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

const Document: NextPage<{ allDocs: Document2[] }> = ({ allDocs }) => {
  const childRef = useRef<DeleteDocument>(null);
  const { classes } = useStyles();
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(documentActions.replaceDocumentList(allDocs));
  }, [dispatch, allDocs]);
  return (
    <>
      <MainLayout order={6}>
        <Center
          style={{
            width: "90vh",
            height: "97vh",
            margin: "0 auto",
          }}
          p={20}
        >
          <Stack style={{ width: "100%", height: "100%" }} m={0}>
            <Group align="center" position="center">
              <Badge size="xl">Document</Badge>
            </Group>
            <Card
              withBorder
              radius="md"
              className={classes.card}
              shadow="sm"
              p={0}
            >
              <Group position="apart" py={5} px={20}>
                <Text weight={700} color={isDeleteMode ? "red" : "black"}>
                  {isDeleteMode ? "Delete Mode" : "Subjects"}
                </Text>
                {isDeleteMode && (
                  <Group>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={() => {
                        childRef.current?.delete();
                      }}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="outline"
                      color="yellow"
                      onClick={() => {
                        setIsDeleteMode(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Group>
                )}
              </Group>
              <ScrollArea style={{ height: "75vh" }} px={20}>
                <SimpleGrid cols={3} p={5}>
                  <DocsList ref={childRef} deleteMode={isDeleteMode} />
                </SimpleGrid>
              </ScrollArea>
            </Card>
          </Stack>
        </Center>
        {!isDeleteMode ? (
          <AddButton>
            <IconCirclePlus
              size={60}
              color="green"
              onClick={() => {
                setIsShowNewForm(true);
              }}
            />
          </AddButton>
        ) : null}
        <DeleteButton>
          <IconCircleMinus
            size={60}
            color="red"
            onClick={() => {
              setIsDeleteMode(true);
            }}
          />
        </DeleteButton>
      </MainLayout>
      <NewDocument
        opened={isShowNewForm}
        onClose={() => {
          setIsShowNewForm(false);
        }}
      />
    </>
  );
};

export default Document;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const documents = await prisma.document.findMany({
    where: { userId: session.sub },
    include: { lessons: true },
  });
  const transformDocs: Document2[] = documents.map((doc) => ({
    ...doc,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    lessons: doc.lessons.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })),
  }));

  return {
    props: {
      allDocs: transformDocs,
    },
  };
};

const AddButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;
const DeleteButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 100px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;
