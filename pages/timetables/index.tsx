import styled from "@emotion/styled";
import { Button, Center, Text, Grid } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Timetable } from "../../types/timetable";
import { Timeline } from "../../types/timeline";
import { RootState, useAppDispatch } from "../../store";
import { timeTableAction } from "../../store/timetable-slice";
import NewTimeTable from "../../components/timetable/newtimetable";
import { useSelector } from "react-redux";
import TimeTableItem from "../../components/timetable/timetableitem";
import { deleteTimetable } from "../../store/timetable-actions";

const TimeTable: NextPage<{ allTimetables: Timetable[] }> = ({
  allTimetables,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(timeTableAction.replaceTimeTableList(allTimetables));
  }, [dispatch, allTimetables]);

  const timetables = useSelector((state: RootState) => state.timetable.items);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Timetable[]>([]);

  const addToSelectedList = (id: string) => {
    const selected = timetables.find((item) => item.id === id);
    setSelectedItem((prevList) => {
      return prevList.concat(selected!);
    });
  };

  const removeFromSelectedList = (id: string) => {
    setSelectedItem((prevList) => {
      return prevList.filter((goal) => goal.id !== id);
    });
  };

  const deleteHandler = async () => {
    const ids = selectedItem.reduce((arr: string[], cur) => {
      return arr.concat(cur.id);
    }, []);
    await dispatch(deleteTimetable(ids));
    setSelectedItem([]);
  };

  useEffect(() => {
    if (!isDeleteMode) {
      setSelectedItem([]);
    }
  }, [isDeleteMode]);

  const showNewFormHandler = () => {
    setIsShowNewForm(true);
  };
  const hideNewFormHandler = () => {
    setIsShowNewForm(false);
  };

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
          {isDeleteMode && (
            <Grid.Col
              span={12}
              style={{ backgroundColor: "white", borderRadius: "8px" }}
            >
              <Center>
                <Text>
                  Select these TIMETABLES you want to DELETE and click DELETE
                  BUTTON,{" "}
                  <Text color="red" style={{ display: "inline" }}>
                    {selectedItem.length}
                  </Text>
                  <Text style={{ display: "inline" }}>
                    {" "}
                    selected TIMETABLES
                  </Text>
                  <Button
                    style={{ display: "block", margin: "0 auto" }}
                    color="red"
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </Text>
              </Center>
            </Grid.Col>
          )}
          {timetables.map((timetable) => (
            <TimeTableItem
              key={timetable.id}
              value={timetable}
              onAdd={addToSelectedList}
              onRemove={removeFromSelectedList}
              isDeleteMode={isDeleteMode}
            />
          ))}
        </Grid>
        {!isDeleteMode ? (
          <AddButton>
            <IconCirclePlus
              size={60}
              color="green"
              onClick={showNewFormHandler}
            />
          </AddButton>
        ) : null}
        <DeleteButton
          onClick={() => {
            setIsDeleteMode((prevMode) => !prevMode);
          }}
        >
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
    startAt: item.startAt!.toISOString(),
    endAt: item.endAt!.toISOString(),
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
