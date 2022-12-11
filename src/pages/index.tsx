import type {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
} from "react";
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

const Input: FC<{
  todo: string;
  onBlur: FocusEventHandler<HTMLDivElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ todo, onBlur, onChange }) => {
  return (
    <Group onBlur={onBlur} p={8} spacing={12}>
      <Checkbox radius="lg" />
      <TextInput
        placeholder="タスクを追加する"
        variant="unstyled"
        size="md"
        styles={{ input: { height: 24, minHeight: 24 } }}
        value={todo}
        onChange={onChange}
      />
    </Group>
  );
};

const Todos: FC = () => {
  const { data: todos, mutate } = useSWR<Todo[]>("/api/todos", async (url) =>
    (await fetch(url)).json()
  );
  const [todo, setTodo] = useInputState("");

  if (!todos)
    return (
      <Input
        todo={todo}
        onBlur={async () => {
          if (!todo) return;
          mutate(
            async () => {
              const reponse = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(todo),
              });
              return await reponse.json();
            },
            {
              optimisticData: [
                {
                  id: 0,
                  text: todo,
                  createdAt: new Date(),
                },
              ],
            }
          );
          setTodo("");
        }}
        onChange={setTodo}
      />
    );

  return (
    <>
      {todos.map(({ id, text }) => {
        return (
          <Todo
            key={id}
            text={text}
            onClick={async () => {
              const currentId = id;
              const nextTodos = todos.filter(({ id }) => id !== currentId);
              mutate(
                async () => {
                  await fetch(`/api/todo/${id}`, {
                    method: "DELETE",
                  });
                  return nextTodos;
                },
                { optimisticData: nextTodos }
              );
            }}
          />
        );
      })}
      <Input
        todo={todo}
        onBlur={async () => {
          if (!todo) return;
          mutate(
            async () => {
              const reponse = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(todo),
              });
              return [...todos, await reponse.json()];
            },
            {
              optimisticData: [
                ...todos,
                {
                  id: 0,
                  text: todo,
                  createdAt: new Date(),
                },
              ],
            }
          );
          setTodo("");
        }}
        onChange={setTodo}
      />
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
