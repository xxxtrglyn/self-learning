import type { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useSelector } from "react-redux";
import Dashboard from "../components/home/dashboard";
import HeroContentLeft from "../components/ui/herosection";
import prisma from "../lib/prisma";
import { RootState, useAppDispatch } from "../store";
import { authActions } from "../store/auth-slice";
import { User } from "../types/user";
import { useEffect } from "react";
import HomePage from "../components/home/homepage";

const Home: NextPage<{ isAuthenticated: boolean; info: User }> = ({
  isAuthenticated,
  info,
}) => {
  let content = <HomePage />;
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
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
  const you = await prisma.user.findUnique({ where: { id: session?.sub } });
  const transformInfo: User = {
    ...you,
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
  };
  return {
    props: {
      isAuthenticated: true,
      info: transformInfo,
    },
  };
};

export default Home;
