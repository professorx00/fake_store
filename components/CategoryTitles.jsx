import React from "react";
import { Heading } from "@chakra-ui/react";
export default function CategoryTitles({ cat }) {
  return <Heading>{cat.toUpperCase()}</Heading>;
}
