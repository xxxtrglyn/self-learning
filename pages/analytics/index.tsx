import { GetServerSideProps, NextPage } from "next";
import React from "react";
import MainLayout from "../../components/ui/mainlayout";
import { SimpleGrid, Group } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import ChartByMonth from "../../components/chart/chartbymonth";
import { LogTime } from "../../types/logtime";

const Analytics: NextPage<{ logtimes: LogTime[] }> = ({ logtimes }) => {
  const valuePerMonth = (month: number) => {
    const data = logtimes.filter(
      (log) => new Date(log.createdAt!).getMonth() === month
    );
    return data;
  };
  return (
    <>
      <MainLayout order={7}>
        <SimpleGrid style={{ width: "90vw", height: "90vh" }} cols={3}>
          <Group position="center" style={{ height: "40vh" }}>
            <ChartByMonth value={valuePerMonth(11)} />
          </Group>
          <Group position="center" style={{ height: "40vh" }}>
            <ChartByMonth value={valuePerMonth(11)} />
          </Group>
          <Group position="center" style={{ height: "40vh" }}>
            <ChartByMonth value={valuePerMonth(11)} />
          </Group>
        </SimpleGrid>
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
