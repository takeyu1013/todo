import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createEmotionCache, MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={createEmotionCache({ key: "mantine" })}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
