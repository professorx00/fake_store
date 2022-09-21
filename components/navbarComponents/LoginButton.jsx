import React, { useState } from "react";
import { Popover, Button, Avatar } from "@mantine/core";
import { IconLogin } from "@tabler/icons";
import LoginForm from "../auth/loginForm";
export default function LoginButton() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      width={300}
      trapFocus
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Avatar
          radius="lg"
          color="light_shade"
          onClick={() => setOpened((o) => !o)}
        >
          <IconLogin />
        </Avatar>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <LoginForm setOpen={setOpened} />
      </Popover.Dropdown>
    </Popover>
  );
}
