import { NextPage } from "next";
import React, { useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import styled from "@emotion/styled";
import {
  Center,
  Card,
  UnstyledButton,
  Text,
  createStyles,
  SimpleGrid,
} from "@mantine/core";
import NewDocument from "../../components/document/newdocument";

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

const Document: NextPage = () => {
  const { classes } = useStyles();
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  return (
    <>
      <MainLayout order={6}>
        <Center
          style={{
            width: "90vh",
            height: "90vh",
            margin: "0 auto",
          }}
          p={20}
        >
          <Card withBorder radius="md" className={classes.card} shadow="sm">
            <Text weight={700} pb={10}>
              Subjects
            </Text>
            <SimpleGrid cols={3}>
              <UnstyledButton className={classes.item}>
                <Text size="xs" mt={7}>
                  Math
                </Text>
              </UnstyledButton>
            </SimpleGrid>
          </Card>
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
          <IconCircleMinus size={60} color="red" />
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
