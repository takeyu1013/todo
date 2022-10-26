import type { NextPage } from "next";

import {
  AppShell,
  Avatar,
  Checkbox,
  Group,
  Header,
  Menu,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);
  const [todos] = useInputState(["foo", "bar", "baz"]);
  const [todo, setTodo] = useInputState("");
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <AppShell
      header={
        <Header
          height={56}
          withBorder={false}
          px={24}
          className="flex items-center justify-between"
        >
          <Space w={36} />
          <Text size={24} color="pink" weight={700}>
            Todo
          </Text>
          <Menu>
            <Menu.Target>
              <Avatar src={user?.profileImageUrl} size={36} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                onClick={() => {
                  signOut();
                }}
              >
                ログアウト
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Header>
      }
    >
      <Stack>
        <Text size={22} color="pink" weight={700} px={8}>
          今日する
        </Text>
        {todos.map((todo, index) => {
          return (
            <Group
              key={index}
              onBlur={() => {
                console.log("check", checked);
                console.log("todo:", todo);
              }}
              p={8}
              spacing={12}
            >
              <Checkbox
                radius="lg"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
              <Text>{todo}</Text>
            </Group>
          );
        })}
        <Group
          onBlur={() => {
            console.log("check", checked);
            console.log("todo:", todo);
          }}
          p={8}
          spacing={12}
        >
          <Checkbox
            radius="lg"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <TextInput
            placeholder="タスクを追加する"
            variant="unstyled"
            size="md"
            styles={{ input: { height: 24, minHeight: 24 } }}
            value={todo}
            onChange={({ currentTarget }) => setTodo(currentTarget.value)}
          />
        </Group>
      </Stack>
    </AppShell>
  );
};

export default Home;
