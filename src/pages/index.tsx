import type { FC } from "react";
import type { NextPage } from "next";

import { useState } from "react";
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
import useSWR from "swr";

const Todo: FC<{ text: string }> = ({ text }) => {
  const [checked, setChecked] = useInputState(false);

  return (
    <Group p={8} spacing={12}>
      <Checkbox radius="lg" checked={checked} onChange={setChecked} />
      <Text>{text}</Text>
    </Group>
  );
};

const Todos: FC = () => {
  const { data } = useSWR<string[]>("/api/todos", async (url) => {
    return (await fetch(url)).json();
  });
  const [todos, setTodos] = useState([""]);
  const [todo, setTodo] = useInputState("");

  return (
    <>
      {(data ? [...data, ...todos] : todos).map((text, index) => {
        return text && <Todo key={index} text={text} />;
      })}
      <Group
        onBlur={() => {
          if (!todo) return;
          setTodos([...todos, todo]);
          setTodo("");
        }}
        p={8}
        spacing={12}
      >
        <Checkbox radius="lg" />
        <TextInput
          placeholder="タスクを追加する"
          variant="unstyled"
          size="md"
          styles={{ input: { height: 24, minHeight: 24 } }}
          value={todo}
          onChange={setTodo}
        />
      </Group>
    </>
  );
};

const Home: NextPage = () => {
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
        <Todos />
      </Stack>
    </AppShell>
  );
};

export default Home;
