import React from "react";
import { TextInput, Checkbox, Button, Group, Box, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useRouter } from "next/router";
import PasswordHider from "../../components/PasswordHider";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*[a-z].*$/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^.*[A-Z].*$/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/^.*[0-9].*$/, "Password must contain at least one number")
    .matches(
      /^.*[!@#$%^&*].*$/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  username: Yup.string().required("Username is required"),
  lastName: Yup.string().required("Last Name is required"),
  firstName: Yup.string().required("First Name is required"),
});

export default function Register() {
  const [globalError, setGlobalError] = React.useState(null);
  const [passwordType, setPasswordType] = React.useState(true);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      lastName: "",
      firstName: "",
    },

    validate: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    try {
      const body = {
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      data.success ? router.push("/auth/userLogin") : setGlobalError(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={1}>Register</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          type={passwordType ? "password" : "text"}
          label="Password"
          placeholder="Password"
          rightSection={
            <PasswordHider
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />
          }
          {...form.getInputProps("password")}
        />
        <TextInput
          withAsterisk
          label="Confirm Password"
          type={passwordType ? "password" : "text"}
          placeholder="Confirm Password"
          rightSection={
            <PasswordHider
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />
          }
          {...form.getInputProps("passwordConfirm")}
        />
        <TextInput
          label="First Name"
          placeholder="John"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last Name"
          placeholder="Smith"
          {...form.getInputProps("lastName")}
        />
        <Title order={6} color="red">
          {globalError}
        </Title>
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
