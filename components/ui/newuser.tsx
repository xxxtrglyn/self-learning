import {
  Stack,
  Modal,
  TextInput,
  Title,
  Button,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import React from "react";
import { RootState, useAppDispatch } from "../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { signUpwithCredentical } from "../../store/auth-actions";

const NewUser: React.FC<{ opened: boolean; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },
    validate: {
      email: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
    },
  });

  const loading = useSelector((state: RootState) => state.ui.loaderOverlay);

  return (
    <>
      <Modal
        padding={20}
        opened={props.opened}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        closeOnClickOutside={false}
        onClose={() => {
          props.onClose();
          form.reset();
        }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(
              signUpwithCredentical({
                email: values.email,
                fullname: values.fullname,
                password: values.password,
              })
            );
            form.reset();
          })}
        >
          <Stack>
            <Title order={2} weight={100} align="center">
              Add new user
            </Title>
            <TextInput
              label="Email"
              placeholder="Enter email here"
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue("email", event.currentTarget.value);
              }}
              error={form.errors.email}
            />
            <TextInput
              label="Fullname"
              placeholder="Enter fullname here"
              value={form.values.fullname}
              onChange={(event) => {
                form.setFieldValue("fullname", event.currentTarget.value);
              }}
              error={form.errors.fullname}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password here"
              value={form.values.password}
              onChange={(event) => {
                form.setFieldValue("password", event.currentTarget.value);
              }}
              error={form.errors.password}
            />

            {loading ? (
              <Button disabled>Posting</Button>
            ) : (
              <Button disabled={!form.isValid()} type="submit">
                Post
              </Button>
            )}
          </Stack>
        </form>
        <LoadingOverlay visible={loading} overlayBlur={0} />
      </Modal>
    </>
  );
};

export default NewUser;
