import { ActionIcon, Center, Grid, ThemeIcon, Text } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import {
  IconTool,
  IconCheck,
  IconCirclePlus,
  IconCircleMinus,
} from "@tabler/icons";
import NewTimeLine from "../../components/timetable/newtimeline";
import styled from "@emotion/styled";
import TimeLineList from "../../components/timetable/timelinelist";
import { useRouter } from "next/router";

const TimeTableDetail: NextPage = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query["timeTableId"] as string;
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
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: "100vh",
          }}
          p={20}
          m={0}
        >
          <TimeLineList id={id} isEdited={isEdited} />

          <ActionIcon style={{ position: "absolute", top: "3%", right: "3%" }}>
            <ThemeIcon
              color="cyan"
              radius="lg"
              size="xl"
              onClick={() => {
                setIsEdited((prev) => !prev);
              }}
            >
              {!isEdited ? <IconTool /> : <IconCheck />}
            </ThemeIcon>
          </ActionIcon>
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
      {<NewTimeLine opened={isShowNewForm} onClose={hideNewFormHandler} />}
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const timetableId = context.params?.timeTableId as string;
//   const timetable = await prisma.timeTable.findUnique({
//     where: {
//       id: timetableId,
//     },
//   });
//   const timeline = await prisma.timeline.findMany({
//     where: {
//       timeTableId: timetableId,
//     },
//   });
//   return {
//     props: {
//       timetable: {
//         ...timetable,
//         createdAt: timetable?.createdAt.toISOString(),
//         updatedAt: timetable?.updatedAt.toISOString(),
//         timelines: timeline.map((item) => ({
//           ...item,
//           createdAt: item.createdAt.toISOString(),
//           updatedAt: item.updatedAt.toISOString(),
//           startAt: item.startAt?.toISOString(),
//           endAt: item.endAt?.toISOString(),
//         })),
//       },
//     },
//   };
// };
// export const getStaticPaths: GetStaticPaths = async () => {
//   const session = await getSession();
//   const timetabs = await prisma.timeTable.findMany({
//     where: {
//       user: { email: session?.user?.email! },
//     },
//   });
//   const id = timetabs.map((item) => {
//     return { params: { timeTableId: item.id } };
//   });

//   return {
//     fallback: false,
//     paths: id,
//   };
// };

export default TimeTableDetail;

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
