import { Grid, Group, Badge, Stack } from "@mantine/core";
import React from "react";
import UserCardImage from "../ui/info";
import StatsCard from "../ui/nextactivity";
import MainLayout from "../ui/mainlayout";
import { User } from "../../types/user";
import Room from "../ui/room";
import TimeTab from "../ui/timetable";
import Note from "../ui/note";
import DocumentSm from "../ui/document";

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <MainLayout order={0}>
      <Stack style={{ height: "80vh" }}>
        <Group align="center" position="center" pt={20} pb={10}>
          <Badge size="xl">dashboard</Badge>
        </Group>
        <Group style={{ height: "80vh" }}>
          <Grid style={{ flex: 1 }} m={0} p={0}>
            <Grid.Col span={12}>
              <UserCardImage
                user={{
                  image:
                    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                  avatar: user?.avatar ? user.avatar : "",
                  name: user?.fullname!,
                  job: user?.job,
                  quotes: user?.quotes ? user.quotes : null,
                  city: user?.city,
                  dob: user?.dob,
                }}
              />
            </Grid.Col>
          </Grid>
          <Grid style={{ flex: 3 }} m={0} p={0}>
            <Grid.Col span={4}>
              <StatsCard value={user?.goals ? user.goals : null} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Room values={user?.rooms ? user.rooms : null} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TimeTab values={user?.timecontrols ? user.timecontrols : null} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Note values={user?.notes ? user.notes : null} />
            </Grid.Col>
            <Grid.Col span={4}>
              <DocumentSm values={user?.documents ? user.documents : null} />
            </Grid.Col>
            {/* <Grid.Col span={4}>
              <StatsCard value={user.goals ? user.goals : null} />
            </Grid.Col> */}
          </Grid>
        </Group>
      </Stack>
    </MainLayout>
  );
};

export default Dashboard;
