import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import MainLayout from "../../components/ui/mainlayout";
import UserTable from "../../components/ui/usertable";
import prisma from "../../lib/prisma";
import { User } from "../../types/user";
import { Stack, Group, Badge, Card, Button } from "@mantine/core";
import NewUser from "../../components/ui/newuser";

const Admin: NextPage<{ allUsers: User[] }> = ({ allUsers }) => {
  const [isShowNewForm, setIsShowNewForm] = useState<boolean>(false);
  return (
    <>
      <MainLayout order={8}>
        <Stack style={{ flex: 1 }} align="center" p={10}>
          <Group align="center" position="center" pt={20} pb={10}>
            <Badge size="xl">Admin</Badge>
          </Group>
          <Group>
            <Button variant="outline" color="red">
              Delete
            </Button>
            <Button
              variant="outline"
              color="blue"
              onClick={() => {
                setIsShowNewForm(true);
              }}
            >
              Create
            </Button>
          </Group>
          <Card radius="sm" shadow="sm">
            <UserTable data={allUsers} />
          </Card>
        </Stack>
      </MainLayout>
      <NewUser
        opened={isShowNewForm}
        onClose={() => {
          setIsShowNewForm(false);
        }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (!session || session.email !== "admin@gmail.com") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const users = await prisma.user.findMany({ where: { role: "user" } });
  const transformUser: User[] = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    emailVerified: user.emailVerified
      ? user.emailVerified?.toISOString()
      : null,
    dob: user.dob ? user.dob?.toISOString() : null,
  }));
  return {
    props: {
      allUsers: transformUser,
    },
  };
};

export default Admin;
