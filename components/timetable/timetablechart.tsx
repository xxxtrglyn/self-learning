import { RingProgress, Text, Group } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Color } from "../../lib/color";

const TimeTableChart: React.FC<{
  id: string;
}> = ({ id }) => {
  const data = useSelector((state: RootState) =>
    state.timetable.items.find((item) => item.id === id)
  );

  const defaultData = [{ value: 100, color: "#f1f3f5", tooltip: "nothing" }];

  const sectionData = data?.timelines.map((item, index) => {
    const startDate = new Date(item.startAt);
    const startMinute = startDate.getUTCMinutes();
    const minuteInString: number | string =
      startMinute < 10 ? "0" + startMinute : startMinute;
    const startHour = (startDate.getUTCHours() + 7) % 24;
    const hourInString: number | string =
      startHour < 10 ? "0" + startHour : startHour;

    const start = hourInString + " : " + minuteInString;
    return {
      value: 20,
      color: Color[index],
      tooltip: start,
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
