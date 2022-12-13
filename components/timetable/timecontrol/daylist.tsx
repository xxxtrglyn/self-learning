import { Card, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DaySlider from "./dayslider";

const DayList = () => {
  const allTimeControl = useSelector((state: RootState) => state.time.items);
  const slide = allTimeControl?.map((item, index) => (
    <DaySlider index={index} key={item.id} id={item.id} />
  ));
  const noSlide = (
    <Card radius="sm" shadow="sm" style={{ display: "inline-block" }}>
      <Text>Create one ?</Text>
    </Card>
  );
  return <>{allTimeControl ? slide : noSlide}</>;
};

export default DayList;
