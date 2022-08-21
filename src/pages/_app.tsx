import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={createEmotionCache({ key: "mantine" })}
    >
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </MantineProvider>
  );
};

export default App;
