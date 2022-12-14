import styled from "@emotion/styled";
import { Badge, Container, Group, ScrollArea, Text } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import prisma from "../../lib/prisma";
import { TimeControl } from "../../types/timecontrol";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons";
import NewForm from "../../components/timetable/timecontrol/newform";
import { useAppDispatch } from "../../store";
import { timeActions } from "../../store/time-slice";
import DayList from "../../components/timetable/timecontrol/daylist";

const DayControl: NextPage<{ allTimeControl: TimeControl[] }> = ({
  allTimeControl,
}) => {
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const showNewFormHandler = () => {
    setIsShowNewForm(true);
  };
  const hideNewFormHandler = () => {
    setIsShowNewForm(false);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(timeActions.replaceTimeList(allTimeControl));
  }, [dispatch, allTimeControl]);

  return (
    <>
      <MainLayout order={3}>
        <Container fluid style={{ flex: 1 }}>
          <Group align="center" position="center" pt={20} pb={10}>
            <Badge size="xl">Timetable</Badge>
          </Group>
          <ScrollArea style={{ height: "80vh" }}>
            {isDelete && (
              <Text weight={500} align="center" color="red">
                Delete Mode
              </Text>
            )}
            <DayList isDelete={isDelete} />
          </ScrollArea>
        </Container>
        <AddButton>
          <IconCirclePlus
            size={60}
            color="green"
            onClick={showNewFormHandler}
          />
        </AddButton>
        <DeleteButton>
          <IconCircleMinus
            size={60}
            color="red"
            onClick={() => {
              setIsDelete((prev) => !prev);
            }}
          />
        </DeleteButton>
      </MainLayout>
      <NewForm opened={isShowNewForm} onClose={hideNewFormHandler} />
    </>
  );
};

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

  const timecontrols = await prisma.timeControl.findMany({
    where: {
      userId: session.sub,
    },
    include: {
      timeitems: true,
    },
  });
  const transformData: TimeControl[] = timecontrols.map((item) => ({
    id: item.id,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    date: item.date.toISOString(),
    timeitems: item.timeitems
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
  }));
  return {
    props: {
      allTimeControl: transformData,
    },
  };
};

export default DayControl;

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
