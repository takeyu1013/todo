import { Avatar } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <header className="flex px-48 py-6">
      <h1 className="my-0 text-3xl font-bold text-rose-600">Todo</h1>
      <Avatar className="ml-auto" />
    </header>
  );
};

export default Home;
