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
  Button,
  Center,
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
import {
  SignedIn,
  SignedOut,
  useClerk,
  useSignIn,
  useUser,
} from "@clerk/nextjs";
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

const GoogleIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.5236 12.2755C23.5236 11.4598 23.4574 10.6397 23.3163 9.83716H11.9976V14.4581H18.4793C18.2103 15.9485 17.3461 17.2669 16.0806 18.1047V21.103H19.9476C22.2184 19.013 23.5236 15.9264 23.5236 12.2755Z"
        fill="#4285F4"
      />
      <path
        d="M11.9979 24C15.2344 24 17.9637 22.9373 19.9524 21.103L16.0854 18.1047C15.0095 18.8366 13.6206 19.2511 12.0023 19.2511C8.8717 19.2511 6.21728 17.139 5.26486 14.2994H1.27441V17.3904C3.31153 21.4426 7.46071 24 11.9979 24Z"
        fill="#34A853"
      />
      <path
        d="M5.2601 14.2995C4.75744 12.8091 4.75744 11.1953 5.2601 9.70496V6.61401H1.27406C-0.427942 10.0048 -0.427942 13.9996 1.27406 17.3904L5.2601 14.2995Z"
        fill="#FBBC04"
      />
      <path
        d="M11.9979 4.74881C13.7087 4.72235 15.3622 5.36611 16.6013 6.54781L20.0273 3.12176C17.8579 1.08465 14.9786 -0.0353205 11.9979 -4.58263e-05C7.46071 -4.58263e-05 3.31153 2.55737 1.27441 6.61395L5.26045 9.7049C6.20846 6.86088 8.86729 4.74881 11.9979 4.74881Z"
        fill="#EA4335"
      />
    </svg>
  );
};

const Home: NextPage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { signIn } = useSignIn();

  return (
    <>
      <SignedIn>
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
                <Text size={24} color="teal" weight={700}>
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
      </SignedIn>
      <SignedOut>
        <Center h="100vh" bg="gray.2">
          <Stack align="center">
            <Text size={48} color="teal" weight={700} pb="xl">
              Todo
            </Text>
            <Button
              leftIcon={<GoogleIcon className="mr-3 h-6 w-6" />}
              variant="default"
              size="lg"
              onClick={() => {
                signIn?.authenticateWithRedirect({
                  strategy: "oauth_google",
                  redirectUrlComplete: "/",
                  redirectUrl: "/",
                });
              }}
            >
              Googleでログイン
            </Button>
          </Stack>
        </Center>
      </SignedOut>
    </>
  );
};

export default Home;
