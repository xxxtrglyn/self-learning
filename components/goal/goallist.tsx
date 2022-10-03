import { Grid } from "@mantine/core";
import React from "react";
import GoalItem from "./goalitem";

const data = [
  {
    title: "Learn React",
    completed: 30,
    total: 100,
    list: [
      {
        label: "Do this",
        isCompleted: true,
      },
      {
        label: "Do that",
        isCompleted: false,
      },
    ],
  },
  {
    title: "Learn Next",
    completed: 25,
    total: 56,
    list: [
      {
        label: "Do this",
        isCompleted: true,
      },
      {
        label: "Do that",
        isCompleted: false,
      },
    ],
  },
  {
    title: "Learn Node",
    completed: 31,
    total: 98,
    list: [
      {
        label: "Do this",
        isCompleted: true,
      },
      {
        label: "Do that that",
        isCompleted: true,
      },
    ],
  },
];

const GoalList = () => {
  const list = data.map((item) => (
    <Grid.Col span={4} key={item.title}>
      <GoalItem {...item} />
    </Grid.Col>
  ));
  return (
    <Grid m={0} p={0} style={{ flex: 1 }}>
      {list}
    </Grid>
  );
};

export default GoalList;
