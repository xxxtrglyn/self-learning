import { Card, Group, Text } from "@mantine/core";
import React, { useState } from "react";
import { TimeItem } from "../../../types/timeitem";
import TimeSlider from "./timeslider";
import { IconPlus } from "@tabler/icons";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { createNewSlider } from "../../../store/timecontrol-actions";
import NewSlider from "./newslider";
import { Color } from "../../../lib/color";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DaySlider: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  const items = useSelector((state: RootState) =>
    state.time.items.find((timeitem) => timeitem.id === id)
  );
  const [timeItem, setTimeItem] = useState<TimeItem[]>([]);
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const fulldate = new Date(items?.date!);

  const monthByNumber = fulldate.getUTCMonth();

  let date: number | string = fulldate.getUTCDate() + 1;
  if (date === 1) {
    date = date.toString() + "st";
  }
  if (date === 2) {
    date = date.toString() + "nd";
  }
  if (date === 3) {
    date = date.toString() + "rd";
  }
  if (date > 3) {
    date = date.toString() + "th";
  }

  const addNewSlider = (
    description: string,
    amount: number,
    documentId: string
  ) => {
    dispatch(
      createNewSlider({
        id: id,
        description: description,
        amount: amount,
        documentId: documentId,
      })
    );
  };

  const timeList = items?.timeitems.map((item, index) => (
    <TimeSlider value={item} key={item.id} color={Color[index]} />
  ));
  return (
    <>
      <Group spacing={5} my={10} mx={10}>
        <Card
          radius="sm"
          shadow="sm"
          style={{ width: "8vw", border: `1px solid ${Color[index]}` }}
          mr={5}
          withBorder
        >
          {monthNames[monthByNumber]}, {date}
        </Card>
        <Card
          style={{
            flex: 1,
            minHeight: "100%",
            border: `1px solid ${Color[index]}`,
          }}
          radius="sm"
          shadow="sm"
          p={5}
        >
          <Group position="apart" style={{ flex: 1, minHeight: "100%" }}>
            <Group spacing={2} style={{ flex: 1, minHeight: "100%" }}>
              {timeList}
            </Group>
            <IconPlus
              style={{ cursor: "pointer", margin: 10 }}
              onClick={() => {
                setIsShowNewForm(true);
              }}
            />
          </Group>
        </Card>
      </Group>
      <NewSlider
        opened={isShowNewForm}
        onClose={() => {
          setIsShowNewForm(false);
        }}
        onAdd={addNewSlider}
      />
    </>
  );
};

export default DaySlider;
