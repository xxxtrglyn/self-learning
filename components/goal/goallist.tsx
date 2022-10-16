import { Grid } from "@mantine/core";
import React from "react";
import GoalItem from "./goalitem";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const GoalList = () => {
  const data = useSelector((state: RootState) => state.goal.items);

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
