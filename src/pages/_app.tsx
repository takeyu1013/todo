import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={createEmotionCache({ key: "mantine" })}
    >
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </MantineProvider>
  );
};

export default App;
