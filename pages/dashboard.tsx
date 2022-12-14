import type { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useSelector } from "react-redux";
import Dashboard from "../components/home/dashboard";
import prisma from "../lib/prisma";
import { RootState, useAppDispatch } from "../store";
import { authActions } from "../store/auth-slice";
import { User } from "../types/user";
import { useEffect } from "react";
import HomePage from "../components/home/homepage";
import { documentActions } from "../store/document-slice";
import { timeActions } from "../store/time-slice";

const Home: NextPage<{ isAuthenticated: boolean; info: User }> = ({
  isAuthenticated,
  info,
}) => {
  let content = <HomePage />;
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(documentActions.replaceDocumentList(info.documents!));
    dispatch(timeActions.replaceTimeList(info.timecontrols!));
    dispatch(authActions.updateInfo(info));
  }, [dispatch, info]);

  if (isAuthenticated || auth.isLogin) {
    content = <Dashboard user={info} />;
  }
  return <>{content}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });

  if (!session) {
    return {
      props: {
        isAuthenticated: false,
        info: null,
      },
    };
  }
  const you = await prisma.user.findUnique({
    where: { id: session?.sub },
    include: {
      goals: { include: { todos: true } },
      joinedRooms: { include: { room: true } },
      timecontrols: { include: { timeitems: true } },
      notes: true,
      documents: true,
    },
  });
  const transformInfo: User = {
    role: you?.role!,
    fullname: you?.fullname,
    job: you?.job,
    avatar: you?.avatar,
    id: you?.id!,
    email: you?.email!,
    dob: you?.dob?.toISOString() ? you.dob.toISOString() : null,
    emailVerified: you?.emailVerified?.toISOString()
      ? you.emailVerified.toISOString()
      : null,
    quotes: you?.quotes,
    city: you?.city,
    createdAt: you?.createdAt.toISOString(),
    updatedAt: you?.updatedAt.toISOString(),
    goals: you?.goals.map((goal) => ({
      ...goal,
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
      start: goal.start.toISOString(),
      end: goal.end.toISOString(),
      todos: goal.todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      })),
    })),
    rooms: you?.joinedRooms.map((join) => ({
      ...join.room,
      createdAt: join.room.createdAt.toISOString(),
      updatedAt: join.room.updatedAt.toISOString(),
    })),
    timecontrols: you?.timecontrols.map((time) => ({
      ...time,
      createdAt: time.createdAt.toISOString(),
      updatedAt: time.createdAt.toISOString(),
      date: time.date.toISOString(),
      timeitems: time.timeitems.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
    })),
    notes: you?.notes.map((note) => ({
      ...note,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    })),
    documents: you?.documents.map((doc) => ({
      ...doc,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    })),
  };
  return {
    props: {
      isAuthenticated: true,
      info: transformInfo,
    },
  };
};

export default Home;
