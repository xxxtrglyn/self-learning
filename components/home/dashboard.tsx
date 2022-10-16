import { Grid } from "@mantine/core";
import React from "react";
import styled from "@emotion/styled";
import UserCardImage from "../ui/info";
import StatsCard from "../ui/nextactivity";
import MainLayout from "../ui/mainlayout";

const Dashboard = () => {
  return (
    <MainLayout order={0}>
      <Grid style={{ flex: 1 }} m={0} p={0}>
        <Grid.Col span={12}>
          <UserCardImage
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            avatar="https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
            name="Bill Headbanger"
            job="Fullstack engineer"
          />
        </Grid.Col>
      </Grid>
      <Grid style={{ flex: 3 }} m={0} p={0}>
        <Grid.Col span={4}>
          <StatsCard />
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          <StatsCard />
        </Grid.Col>
        <Grid.Col span={4}>
          <StatsCard />
        </Grid.Col>
        <Grid.Col span={4}>
          <StatsCard />
        </Grid.Col>
        <Grid.Col span={4}>
          <StatsCard />
        </Grid.Col>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #f8f9fa;
`;
