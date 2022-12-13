import type { NextPage } from "next";

import HomePage from "../components/home/homepage";

const Home: NextPage = () => {
  let content = <HomePage />;

  return <>{content}</>;
};

export default Home;
