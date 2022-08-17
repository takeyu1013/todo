import type { NextPage } from "next";

import {
  AppShell,
  Avatar,
  Header,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

const Home: NextPage = () => {
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
          <Avatar size={36} />
        </Header>
      }
    >
      <Stack>
        <Text size={22} color="pink" weight={700} px={8}>
          今日する
        </Text>
        <TextInput placeholder="タスクを追加する" variant="unstyled" />
      </Stack>
    </AppShell>
  );
};

export default Home;
