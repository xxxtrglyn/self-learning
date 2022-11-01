import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { useSelector } from "react-redux";
import Dashboard from "../components/home/dashboard";
import HeroContentLeft from "../components/ui/herosection";
import { RootState } from "../store";

const Home: NextPage<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  let content = <HeroContentLeft />;
  const auth = useSelector((state: RootState) => state.auth);

  if (isAuthenticated || auth.isLogin) {
    content = <Dashboard />;
  }
  return <>{content}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });

  if (!session) {
    return {
      props: {
        isAuthenticated: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated: true,
    },
  };
};

export default Home;
