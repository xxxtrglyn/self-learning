import type { NextPage } from "next";
import { useSelector } from "react-redux";
import Dashboard from "../components/home/dashboard";
import HeroContentLeft from "../components/ui/herosection";
import { RootState } from "../store";

const Home: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  let content = <HeroContentLeft />;
  if (auth.isLogin === true) {
    content = <Dashboard />;
  }
  return <>{content}</>;
};

export default Home;
