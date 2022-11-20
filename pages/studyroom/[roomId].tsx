import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React from "react";
import ChatRoom from "../../components/studyroom/chatroom";
import MainLayout from "../../components/ui/mainlayout";
import prisma from "../../lib/prisma";
import { User } from "../../types/user";

const DetailRoom: NextPage<{ userList: User[] }> = ({ userList }) => {
  const router = useRouter();
  const roomId = router.query["roomId"] as string;
  return (
    <MainLayout order={2}>
      <ChatRoom id={roomId} members={userList} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const roomId = context!.params!.roomId as string;

  const roomMember = await prisma.user.findMany({
    where: {
      joinedRooms: { some: { roomId: roomId } },
    },
  });
  const transformUserList: User[] = roomMember.map((user) => ({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    dob: user.dob?.toISOString(),
    phone: user.phone,
    job: user.job,
  }));

  return {
    props: {
      userList: transformUserList,
    },
  };
};

export default DetailRoom;
