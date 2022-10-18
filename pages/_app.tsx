import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "../store";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
