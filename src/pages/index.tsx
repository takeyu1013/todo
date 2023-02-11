import type {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEventHandler,
} from "react";
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
  id: number | undefined;
  text: string;
  checked: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ id, text, checked: initialChecked, onClick }) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <Group position="apart">
      <Group p={8} spacing={12}>
        <Checkbox
          radius="lg"
          checked={checked}
          onChange={async ({ currentTarget: { checked } }) => {
            setChecked(checked);
            await fetch(`/api/todo/${id}`, {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(checked),
            });
          }}
        />
        {checked ? (
          <Text c="dimmed" td="line-through">
            {text}
          </Text>
        ) : (
          <Text>{text}</Text>
        )}
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
  const { data: todos, mutate } = useSWR<
    (Pick<Todo, "text" | "checked"> & { id?: number; createdAt?: Date })[]
  >("/api/todos", async (url) => (await fetch(url)).json());
  const [todo, setTodo] = useInputState("");

  if (!todos)
    return (
      <Input
        todo={todo}
        onBlur={() => {
          if (!todo) return;
          mutate(
            async () =>
              (
                await fetch("/api/todos", {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify(todo),
                })
              ).json(),
            {
              optimisticData: [
                {
                  id: undefined,
                  text: todo,
                  createdAt: undefined,
                  checked: false,
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
      {todos.map(({ id, text, checked }) => (
        <Todo
          key={id}
          id={id}
          text={text}
          checked={checked}
          onClick={async () => {
            const currentId = id;
            mutate(
              todos.filter(({ id }) => id !== currentId),
              false
            );
            await fetch(`/api/todo/${id}`, {
              method: "DELETE",
            });
            mutate();
          }}
        />
      ))}
      <Input
        todo={todo}
        onBlur={async () => {
          if (!todo) return;
          mutate(
            async () => [
              ...todos,
              await (
                await fetch("/api/todos", {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify(todo),
                })
              ).json(),
            ],
            {
              optimisticData: [
                ...todos,
                {
                  id: undefined,
                  text: todo,
                  checked: false,
                  createdAt: undefined,
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
          className="flex justify-center"
        >
          <Group position="apart" className="max-w-5xl flex-grow">
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
          </Group>
        </Header>
      }
      classNames={{ main: "flex justify-center" }}
    >
      <Stack className="max-w-5xl flex-grow">
        <Todos />
      </Stack>
    </AppShell>
  );
};

export default Home;
