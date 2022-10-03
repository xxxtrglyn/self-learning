import { RingProgress, Text, Group } from "@mantine/core";
import React from "react";

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
  data: {
    title: string;
    data: { title: string; time: string; info: string }[];
  };
}> = (props) => {
  const sectionData = props.data.data.map((item, index) => {
    return {
      value: 20,
      color: COLOR[index],
      tooltip: item.time,
    };
  });
  return (
    <Group position="center">
      <RingProgress
        size={200}
        thickness={25}
        label={
          <Text size="xs" align="center" px="xs" sx={{ pointerEvents: "none" }}>
            {props.data.title}
          </Text>
        }
        sections={sectionData}
      />
    </Group>
  );
};
export default TimeTableChart;
