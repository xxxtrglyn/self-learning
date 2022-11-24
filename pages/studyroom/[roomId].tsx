import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React from "react";
import ChatRoom from "../../components/studyroom/chatroom";
import MainLayout from "../../components/ui/mainlayout";
import prisma from "../../lib/prisma";
import { Message } from "../../types/message";
import { User } from "../../types/user";

const DetailRoom: NextPage<{ userList: User[]; messagesList: Message[] }> = ({
  userList,
  messagesList,
}) => {
  const router = useRouter();
  const roomId = router.query["roomId"] as string;
  return (
    <MainLayout order={2}>
      <ChatRoom
        id={roomId}
        members={userList}
        messagesList={messagesList}
        roomName={router.query["roomName"] as string}
      />
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

  const messages = await prisma.messageLine.findMany({
    where: {
      roomId: roomId,
    },
    include: { user: true },
  });

  const transformMessages: Message[] = messages.map((message) => ({
    id: message.id,
    user: {
      id: message.user.id,
      fullname: message.user.fullname,
      email: message.user.email,
      avatar: message.user.avatar ? message.user.avatar : null,
      dob: message.user.dob?.toISOString()
        ? message.user.dob.toISOString()
        : null,
      phone: message.user.phone ? message.user.phone : null,
      job: message.user.job ? message.user.job : null,
    },
    content: message.content,
  }));

  const roomMember = await prisma.user.findMany({
    where: {
      joinedRooms: { some: { roomId: roomId } },
    },
  });
  const transformUserList: User[] = roomMember.map((user) => ({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : null,
    dob: user.dob?.toISOString() ? user.dob.toISOString() : null,
    phone: user.phone ? user.phone : null,
    job: user.job ? user.job : null,
  }));

  return {
    props: {
      userList: transformUserList,
      messagesList: transformMessages,
    },
  };
};

export default DetailRoom;
