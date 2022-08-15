import type { NextPage } from "next";

import { AppShell, Header, Text } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <AppShell
      header={
        <Header
          height={56}
          withBorder={false}
          className="flex items-center justify-center"
        >
          <Text size={24} color="pink" weight={700}>
            Todo
          </Text>
        </Header>
      }
    >
      <Text size={22} color="pink" weight={700}>
        今日する
      </Text>
    </AppShell>
  );
};

export default Home;
