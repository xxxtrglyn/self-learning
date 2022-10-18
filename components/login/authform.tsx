import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
} from "@mantine/core";
import { FacebookButton, GoogleButton } from "./socialbutton";
import React from "react";
import { signInWithCredential } from "../../store/auth-actions";
import { useAppDispatch } from "../../store";

const Auth: React.FC<{
  isOpened: boolean;
  onClose: () => void;
}> = ({ isOpened, onClose }) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      username: (val) => (/^\S+\S+$/.test(val) ? null : "Invalid username"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const dispatch = useAppDispatch();

  return (
    <Modal
      padding={20}
      opened={isOpened}
      withCloseButton={false}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={true}
      onClose={onClose}
    >
      <Text size="lg" weight={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(
            signInWithCredential({
              username: values.username,
              password: values.password,
            })
          );
          // if (
          //   values.username === "xxxtrglyn@gmail.com" &&
          //   values.password === "1234567"
          // ) {
          //   dispatch(authActions.login());
          // }
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="xxxtrglyn"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Invalid username"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default Auth;
