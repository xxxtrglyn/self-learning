import React from "react";
import { Carousel } from "@mantine/carousel";
import { createStyles } from "@mantine/core";
import RoomCard from "./roomcard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useStyles = createStyles(() => ({
  container: {
    flex: 1,
  },
}));

const RoomList = () => {
  const { classes } = useStyles();
  const rooms = useSelector((state: RootState) => state.room.items);
  const slides = rooms.map((slide) => (
    <Carousel.Slide key={slide.id}>
      <RoomCard values={slide} />
    </Carousel.Slide>
  ));

  return (
    <div className={classes.container}>
      <Carousel withIndicators slideSize="20%" loop>
        {slides}
      </Carousel>
    </div>
  );
};

export default RoomList;
