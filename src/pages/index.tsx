import { Avatar, Menu } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <header className="flex px-48 py-6">
        <h1 className="my-0 text-3xl font-bold text-rose-500">Todo</h1>
        <Menu
          className="ml-auto"
          classNames={{ body: "px-0 py-2 w-80 rounded-2xl" }}
          control={
            <Avatar className="cursor-pointer opacity-60 hover:opacity-100" />
          }
          placement="center"
        >
          <Menu.Item className="px-6 py-3 font-bold">設定</Menu.Item>
          <Menu.Item className="px-6 py-3 font-bold text-red-500">
            ログアウト
          </Menu.Item>
        </Menu>
      </header>
      <main className="flex px-20">
        {(
          [
            ["text-rose-500", "今日する"],
            ["text-orange-400", "明日する"],
            ["text-yellow-400", "今度する"],
          ] as const
        ).map(([color, schedule]) => {
          return (
            <div key={color} className="w-1/3">
              <div className="px-6 pt-6">
                <h2 className={`my-0 font-bold ${color}`}>{schedule}</h2>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
