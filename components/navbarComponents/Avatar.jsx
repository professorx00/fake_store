import Image from "next/image";
import React, { useState } from "react";
import { Avatar, Box, Button, Popover } from "@mantine/core";
import { signOut } from "next-auth/react";
import Cart from "./Cart";

export default function AppAvatar({ user }) {
  const img = user?.image;
  const [opened, setOpened] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Cart />
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Avatar
            color="main"
            sx={{ border: "3px Solid #FFF", borderRadius: "50%" }}
            onClick={() => setOpened((o) => !o)}
          >
            DW
          </Avatar>
        </Popover.Target>
        <Popover.Dropdown>
          <Button color="main" fullWidth onClick={() => signOut()}>
            SignOut
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}
