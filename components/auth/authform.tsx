import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { FacebookButton, GoogleButton } from "./socialbutton";
import React from "react";
import {
  signInWithCredential,
  signUpwithCredentical,
} from "../../store/auth-actions";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

const Auth: React.FC<{
  isOpened: boolean;
  onClose: () => void;
}> = ({ isOpened, onClose }) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.ui.loaderOverlay);

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
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Text size="lg" weight={500}>
        Welcome to Self-Learning, {type} with
      </Text>

      <form
        onSubmit={form.onSubmit((values) => {
          if (type === "login") {
            dispatch(
              signInWithCredential({
                email: values.email,
                password: values.password,
              })
            );
          } else {
            dispatch(
              signUpwithCredentical({
                email: values.email,
                password: values.password,
                fullname: values.name,
              })
            );
          }
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
            type="email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
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
