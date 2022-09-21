import { Box, Title } from "@mantine/core";
import React from "react";

export default function Logo() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Title order={1} color="light_shade.0">
        Shop Name
      </Title>
    </Box>
  );
}
