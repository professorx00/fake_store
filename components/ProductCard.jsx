import { Flex, Box, Image, Button, Heading } from "@chakra-ui/react";
import React from "react";

export default function ProductCard({ product }) {
  return (
    <Flex>
      <Image
        src={product.image}
        alt={product.title}
        boxSize="150px"
        objectFit="cover"
        p={2}
      />
      <Box>
        <Heading as="h6" size="md" mx={4} mb={6} mt={3}>
          {product.title.slice(0, 30)}
        </Heading>
        <Box display="flex" justifyContent="space-between">
          <Heading as="h3" size="lg">
            ${product.price}
          </Heading>
          <Button>Add Item</Button>
        </Box>
      </Box>
    </Flex>
  );
}
