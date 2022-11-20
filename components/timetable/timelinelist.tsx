import { Grid } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Timetable } from "../../types/timetable";
import TimelineNow from "./timeline";

const TimeLineList: React.FC<{ id: string; isEdited: boolean }> = ({
  id,
  isEdited,
}) => {
  const timetable = useSelector((state: RootState) =>
    state.timetable.items.find((item) => item.id === id)
  );
  return (
    <>
      {timetable?.timelines.map((timeline, index) => (
        <Grid.Col key={timeline.id} span={2} style={{ height: "95vh" }}>
          <TimelineNow order={index} data={timeline} isEdited={isEdited} />
        </Grid.Col>
      ))}
    </>
  );
};

export default TimeLineList;
