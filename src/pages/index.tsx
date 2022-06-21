import type { NextPage } from "next";

import { Avatar, Checkbox, Group, Input, Menu, Title } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <div>
      <header className="flex px-48 py-6">
        <Title className="text-3xl text-rose-500" order={2}>
          Todo
        </Title>
        <Menu
          className="ml-auto"
          classNames={{
            body: "px-0 py-2 w-80 rounded-2xl",
            item: "px-6 py-3 text-sm font-bold",
          }}
          control={
            <Avatar className="cursor-pointer opacity-60 hover:opacity-100" />
          }
          placement="center"
        >
          <Menu.Item>設定</Menu.Item>
          <Menu.Item color="red">ログアウト</Menu.Item>
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
              <div className="p-6">
                <Title className={`text-xl font-bold ${color}`} order={2}>
                  {schedule}
                </Title>
                <Group spacing="sm">
                  <Checkbox radius="lg" />
                  <Input
                    variant="unstyled"
                    placeholder="タスクを追加する"
                    size="md"
                  />
                </Group>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
