import { RingProgress, Text, Group } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Color } from "../../lib/color";

const calculateTime = (date: string) => {
  const startDate = new Date(date);
  const startMinute = startDate.getUTCMinutes();
  const minuteInString: number | string =
    startMinute < 10 ? "0" + startMinute : startMinute;
  const startHour = (startDate.getUTCHours() + 7) % 24;
  const hourInString: number | string =
    startHour < 10 ? "0" + startHour : startHour;
  return hourInString + " : " + minuteInString;
};

const TimeTableChart: React.FC<{
  id: string;
}> = ({ id }) => {
  const data = useSelector((state: RootState) =>
    state.timetable.items.find((item) => item.id === id)
  );

  const defaultData = [{ value: 100, color: "#f1f3f5", tooltip: "nothing" }];

  const sectionData = data?.timelines.map((item, index) => {
    const start = calculateTime(item.startAt);
    const end = calculateTime(item.endAt);
    const content = "From " + start + " to " + end + " do " + item.moreDetail;

    const value =
      ((new Date(item.endAt).getHours() - new Date(item.startAt).getHours()) *
        60 +
        (new Date(item.endAt).getMinutes() -
          new Date(item.startAt).getMinutes())) /
      60 /
      24;

    return {
      value: value * 100,
      color: Color[index],
      tooltip: content,
    };
  });
  return (
    <Group position="center">
      <RingProgress
        size={200}
        thickness={15}
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
