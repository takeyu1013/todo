import type { FC, MouseEventHandler } from "react";
import type { NextPage } from "next";
import type { Todo } from "@prisma/client";

import { useState } from "react";
import {
  AppShell,
  Avatar,
  Checkbox,
  CloseButton,
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

const Todo: FC<{
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ text, onClick }) => {
  const [checked, setChecked] = useInputState(false);

  return (
    <Group position="apart">
      <Group p={8} spacing={12}>
        <Checkbox radius="lg" checked={checked} onChange={setChecked} />
        <Text>{text}</Text>
      </Group>
      <CloseButton onClick={onClick} />
    </Group>
  );
};

const Todos: FC = () => {
  // const { data } = useSWR<Todo[]>("/api/todo", async (url) => {
  //   return (await fetch(url)).json();
  // });
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useInputState("");

  return (
    <>
      {/* {(data || [{ id: 0, text: "" }]).map(({ id, text }, index) => { */}
      {todos.map((text, index) => {
        return (
          text && (
            <Todo
              key={index}
              text={text}
              onClick={async () => {
                // await fetch("/api/todo:id", {
                //   method: "POST",
                //   headers: { "Content-type": "application/json" },
                //   body: JSON.stringify(todo),
                // });
                setTodos((todos) =>
                  todos.filter((todo) => todo !== todos[index])
                );
              }}
            />
          )
        );
      })}
      <Group
        onBlur={async () => {
          if (!todo) return;
          setTodos([...todos, todo]);
          setTodo("");
          // await fetch("/api/todos", {
          //   method: "POST",
          //   headers: { "Content-type": "application/json" },
          //   body: JSON.stringify(todo),
          // });
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
