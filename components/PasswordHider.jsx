import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons";

export default function PasswordHider({ passwordType, setPasswordType }) {
  return passwordType ? (
    <ActionIcon
      onClick={() => {
        setPasswordType(!passwordType);
      }}
    >
      <IconEye size={18} />
    </ActionIcon>
  ) : (
    <ActionIcon
      onClick={() => {
        setPasswordType(!passwordType);
      }}
    >
      <IconEyeOff size={18} />
    </ActionIcon>
  );
}
