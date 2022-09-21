import React from "react";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function NavMenu({ categories }) {
  const router = useRouter();
  return (
    categories && (
      <div>
        {categories.map((cat) => {
          return (
            <Button
              variant="subtle"
              key={cat}
              color="light_accent"
              sx={{
                marginLeft: 2,
                marginRight: 2,
              }}
              onClick={() => {
                router.push(`/departments/${cat}`);
              }}
            >
              {cat.toUpperCase()}
            </Button>
          );
        })}
      </div>
    )
  );
}
