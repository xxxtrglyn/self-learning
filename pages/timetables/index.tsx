import styled from "@emotion/styled";
import { Button, Card, Grid } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import TimeTableChart from "../../components/timetable/timetablechart";
import MainLayout from "../../components/ui/mainlayout";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Timetable } from "../../types/timetable";
import { Timeline } from "../../types/timeline";
import { useAppDispatch } from "../../store";
import { timeTableAction } from "../../store/timetable-slice";
import NewTimeTable from "../../components/timetable/newtimetable";
import { useRouter } from "next/router";

const TimeTable: NextPage<{ allTimetables: Timetable[] }> = ({
  allTimetables,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(timeTableAction.replaceTimeTableList(allTimetables));
  }, [dispatch, allTimetables]);

  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const showNewFormHandler = () => {
    setIsShowNewForm(true);
  };
  const hideNewFormHandler = () => {
    setIsShowNewForm(false);
  };

  const router = useRouter();
  return (
    <>
      <MainLayout order={3}>
        <Grid
          m={0}
          p={20}
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          {allTimetables?.map((timetable) => (
            <Grid.Col key={timetable.id} span={4}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`timetables/${timetable.id}`);
                }}
              >
                <TimeTableChart id={timetable.id} />
                <Button>Set as default</Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        <AddButton>
          <IconCirclePlus
            size={60}
            color="green"
            onClick={showNewFormHandler}
          />
        </AddButton>
        <DeleteButton>
          <IconCircleMinus size={60} color="red" />
        </DeleteButton>
      </MainLayout>
      {<NewTimeTable opened={isShowNewForm} onClose={hideNewFormHandler} />}
    </>
  );
};

export default TimeTable;

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

  const timetable = await prisma.timeTable.findMany({
    where: {
      userId: session.sub,
    },
  });

  const timeline = await prisma.timeline.findMany({
    where: {
      timetable: {
        userId: session.sub,
      },
    },
  });

  const transformTimeline: Timeline[] = timeline.map((item) => ({
    id: item.id,
    timeTableId: item.timeTableId,
    startAt: item.startAt.toISOString(),
    endAt: item.endAt.toISOString(),
    moreDetail: item.moreDetail,
  }));

  const transformTable: Timetable[] = timetable.map((item) => {
    return {
      id: item.id,
      userId: item.id,
      title: item.title,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      timelines: transformTimeline.filter(
        (timeline) => timeline.timeTableId === item.id
      ),
    };
  });

  return {
    props: {
      allTimetables: transformTable,
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
