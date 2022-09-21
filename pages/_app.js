import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({
  Component,
  pageProps: { session, categories, ...pageProps },
}) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <NavBar categories={categories} />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
