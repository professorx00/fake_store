import React, { useMemo } from "react";
import { Container } from "@mantine/core";
import Logo from "./navbarComponents/Logo";
import NavMenu from "./navbarComponents/NavMenu";
import { useSession } from "next-auth/react";
import AppAvatar from "./navbarComponents/Avatar";
import LoginButton from "./navbarComponents/LoginButton";

export default function NavBar({ categories }) {
  const { data: session, status } = useSession();
  const [cats, setCats] = React.useState(categories);
  useMemo(() => {
    const getCats = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCats(data);
    };
    getCats();
  }, [setCats]);
  return (
    <Container fluid>
      <Logo />
      {status === "authenticated" && <NavMenu categories={cats} />}
      {status === "authenticated" && <AppAvatar user={session?.userData} />}
      {status !== "authenticated" && <LoginButton />}
    </Container>
  );
}
