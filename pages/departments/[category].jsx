import { Box, SimpleGrid, Container } from "@chakra-ui/react";
import React from "react";
import CategoryTitles from "../../components/CategoryTitles";
import ProductCard from "../../components/ProductCard";
export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await res.json();

  return {
    props: {
      category: category,
      products: data,
    }, // will be passed to the page component as props
  };
}

export default function Departments({ products, category }) {
  return (
    <Container maxWidth={1920} bg="blue.600">
      <CategoryTitles cat={category} />
      <SimpleGrid columns={[1, 2, 3]}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
