import type { NextPage } from "next";

import {
  AppShell,
  Avatar,
  Checkbox,
  Group,
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
        <Group p={8} spacing={12}>
          <Checkbox radius="lg" />
          <TextInput
            placeholder="タスクを追加する"
            variant="unstyled"
            size="md"
            styles={{ input: { height: 24, minHeight: 24 } }}
          />
        </Group>
      </Stack>
    </AppShell>
  );
};

export default Home;
