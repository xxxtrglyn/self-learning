import { Grid, Group } from "@mantine/core";
import React from "react";
import UserCardImage from "../ui/info";
import StatsCard from "../ui/nextactivity";
import MainLayout from "../ui/mainlayout";
import { User } from "../../types/user";

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <MainLayout order={0}>
      <Group style={{ height: "80vh" }}>
        <Grid style={{ flex: 1 }} m={0} p={0}>
          <Grid.Col span={12}>
            <UserCardImage
              image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
              avatar={user?.avatar ? user.avatar : ""}
              name={user?.fullname!}
              job={user?.job ? user.job : "Unknown"}
            />
          </Grid.Col>
        </Grid>
        <Grid style={{ flex: 3 }} m={0} p={0}>
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
          <Grid.Col span={4}>
            <StatsCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <StatsCard />
          </Grid.Col>
        </Grid>
      </Group>
    </MainLayout>
  );
};

export default Dashboard;
