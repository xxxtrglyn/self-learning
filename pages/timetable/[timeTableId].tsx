import { Grid } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import TimelineNow from "../../components/timetable/timeline";
import TimeTableChart from "../../components/timetable/timetablechart";
import MainLayout from "../../components/ui/mainlayout";

const DUMMY = {
  title: "the time table",
  data: [
    {
      title: "first",
      time: "5h30-6h30",
      info: "nothing special",
    },
    {
      title: "second",
      time: "5h30-6h30",
      info: "nothing special",
    },
    {
      title: "third",
      time: "5h30-6h30",
      info: "nothing special",
    },
  ],
};

const TimeTableDetail: NextPage = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <Grid
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "white",
          height: "100vh",
        }}
        p={20}
        m={0}
      >
        <Grid.Col span={6}>
          <TimelineNow data={DUMMY} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TimeTableChart data={DUMMY} />
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export default TimeTableDetail;
