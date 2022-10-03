import { Button, Card, Grid } from "@mantine/core";
import { NextPage } from "next";
import React from "react";
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

const TimeTable: NextPage = () => {
  return (
    <MainLayout>
      <Grid
        m={0}
        p={20}
        style={{
          flex: 1,
          textAlign: "center",
        }}
      >
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <TimeTableChart data={DUMMY} />
            <Button>Set as default</Button>
          </Card>
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export default TimeTable;
