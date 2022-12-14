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
        <TimelineNow
          key={timeline.id}
          order={index}
          data={timeline}
          isEdited={isEdited}
        />
      ))}
    </>
  );
};

export default TimeLineList;
