import type { FC, MouseEventHandler } from "react";
import type { NextPage } from "next";
import type { Todo } from "@prisma/client";

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
  const { data: todos, mutate } = useSWR<Todo[]>("/api/todos", async (url) =>
    (await fetch(url)).json()
  );
  const [todo, setTodo] = useInputState("");

  return (
    <>
      {todos &&
        todos.map(({ id, text }) => {
          return (
            <Todo
              key={id}
              text={text}
              onClick={async () => {
                const currentId = id;
                await fetch(`/api/todo/${id}`, {
                  method: "DELETE",
                });
                mutate(todos.filter(({ id }) => id !== currentId));
              }}
            />
          );
        })}
      <Group
        onBlur={async () => {
          if (!todo || !todos) return;
          await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(todo),
          });
          mutate([
            ...todos,
            {
              id: 0,
              text: todo,
              createdAt: new Date(),
            },
          ]);
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
        <Todos />
      </Stack>
    </AppShell>
  );
};

export default Home;
