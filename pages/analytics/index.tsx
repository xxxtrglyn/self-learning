import { GetServerSideProps, NextPage } from "next";
import React from "react";
import MainLayout from "../../components/ui/mainlayout";
import { Grid, Group } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import ChartByMonth from "../../components/chart/chartbymonth";
import { LogTime } from "../../types/logtime";
import ChartByDay from "../../components/chart/chartbyday";

const Analytics: NextPage<{ logtimes: LogTime[] }> = ({ logtimes }) => {
  return (
    <>
      <MainLayout order={7}>
        <Grid style={{ width: "90vw", height: "90vh" }} p={10}>
          <Grid.Col span={12}>
            <Group position="center" style={{ height: "40vh" }}>
              <ChartByMonth value={logtimes} />
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position="center" style={{ height: "50vh" }}>
              <ChartByDay value={logtimes} />
            </Group>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const logTime = await prisma.logTime.findMany({
    where: {
      userId: session!.sub,
    },
    include: {
      document: true,
    },
  });

  const transform: LogTime[] = logTime.map((log) => ({
    ...log,
    createdAt: log.createdAt.toISOString(),
    updatedAt: log.updatedAt.toISOString(),
    document: {
      ...log.document,
      createdAt: log.createdAt.toISOString(),
      updatedAt: log.document.updatedAt.toISOString(),
    },
  }));
  return {
    props: {
      logtimes: transform,
    },
  };
};

export default Analytics;
