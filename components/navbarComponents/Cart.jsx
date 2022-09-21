import { Box, Title, Badge } from "@mantine/core";
import React from "react";
import { IconShoppingCart } from "@tabler/icons";

export default function Cart({ cart }) {
  return cart ? (
    <Box sx={{ marginRight: "2em" }}>
      <IconShoppingCart color="#9891AB" />
      <Badge>{cart?.quantities}</Badge>
    </Box>
  ) : (
    <Box sx={{ marginRight: "2em" }}>
      <IconShoppingCart color="#9891AB" />
    </Box>
  );
}
