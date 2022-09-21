import React from "react";
import { signIn } from "next-auth/react";
import { TextInput, Button, Group, Box, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Username is required"),
});

export default function LoginForm({ setOpen = null }) {
  const [globalError, setGlobalError] = React.useState(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      password: "",
      username: "",
    },

    validate: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const g = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });
    g.status !== 200 && setGlobalError(g.error);
    g.status === 200 && router.push("/");
  };
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={1}>Login</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Title order={6} color="red">
          {globalError ? globalError : null}
        </Title>
        <Group position="right" mt="md">
          <Button
            variant="outline"
            color="main"
            onClick={() => {
              router.push("/auth/register");
              setOpen && setOpen((o) => !o);
            }}
          >
            Register{" "}
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
