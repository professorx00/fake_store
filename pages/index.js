import { Container } from "@mantine/core";
import { useSession } from "next-auth/react";
import NoUserMainPage from "../components/NoUserMainPage";
import MainPage from "../components/MainPage";
import { Flex } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return {
    props: {
      categories: data,
    }, // will be passed to the page component as props
  };
}

export default function Home({ categories }) {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return (
      <Flex>
        <NoUserMainPage />
      </Flex>
    );
  }
  return (
    <Flex>
      <MainPage categories={categories} />
    </Flex>
  );
}
