import { Avatar, Menu } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <header className="flex px-48 py-6">
        <h1 className="my-0 text-3xl font-bold text-rose-600">Todo</h1>
        <Menu className="ml-auto" control={<Avatar />}>
          <Menu.Item>設定</Menu.Item>
          <Menu.Item>ログアウト</Menu.Item>
        </Menu>
      </header>
      <main className="mx-20">
        <div className="mx-6 mt-6">
          <h2 className="my-0">今日する</h2>
        </div>
      </main>
    </div>
  );
};

export default Home;
