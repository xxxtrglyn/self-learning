import React from "react";
import { Carousel } from "@mantine/carousel";
import { createStyles, Text, Card, Center } from "@mantine/core";
import RoomCard from "./roomcard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useStyles = createStyles(() => ({
  container: {
    flex: 1,
  },
}));

const RoomList: React.FC<{}> = () => {
  const { classes } = useStyles();
  const rooms = useSelector((state: RootState) => state.room.items);
  const slides = rooms.map((slide) => (
    <Carousel.Slide key={slide.id}>
      <RoomCard values={slide} />
    </Carousel.Slide>
  ));
  const noRoom = (
    <Center>
      <Card shadow="sm" style={{ display: "inline-block" }}>
        <Text size="xl">You join no room!</Text>
      </Card>
    </Center>
  );

  return (
    <div className={classes.container}>
      {rooms.length > 0 ? (
        <Carousel withIndicators slideSize="20%" loop>
          {slides}
        </Carousel>
      ) : (
        noRoom
      )}
    </div>
  );
};

export default RoomList;
