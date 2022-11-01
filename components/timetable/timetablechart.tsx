import { RingProgress, Text, Group } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const COLOR = [
  "#00FF7F",
  "#ADD8E6",
  "#9370DB",
  "#FFE4E1",
  "#A0522D",
  "#EE82EE",
  "#DAA520",
  "#8FBC8F",
  "#800000",
  "#FDF5E6",
  "#00008B",
  "#DC143C",
  "#8B0000",
  "#7FFF00",
  "#008080",
  "#008B8B",
  "#90EE90",
  "#FFFAFA",
  "#E9967A",
];

const TimeTableChart: React.FC<{
  id: string;
}> = ({ id }) => {
  const data = useSelector((state: RootState) =>
    state.timetable.items.find((item) => item.id === id)
  );

  const defaultData = [{ value: 100, color: "#f1f3f5", tooltip: "nothing" }];

  const sectionData = data?.timelines.map((item, index) => {
    return {
      value: 20,
      color: COLOR[index],
      tooltip: item.startAt,
    };
  });
  return (
    <Group position="center">
      <RingProgress
        size={200}
        thickness={25}
        label={
          <Text size="xs" align="center" px="xs" sx={{ pointerEvents: "none" }}>
            {data?.title}
          </Text>
        }
        sections={sectionData ? sectionData : defaultData}
      />
    </Group>
  );
};
export default TimeTableChart;
