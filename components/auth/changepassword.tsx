import React from "react";
import { Modal, TextInput, Stack, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RootState, useAppDispatch } from "../../store";
import { changePassword } from "../../store/auth-actions";
import { useSelector } from "react-redux";

const ChangePassword: React.FC<{ opened: boolean; onClose: () => void }> = (
  props
) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.ui.loaderOverlay);

  const form = useForm({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    },
    validate: {
      repassword: (value, values) =>
        value.length < 8
          ? "Password should have more than 8 characters"
          : value !== values.newpassword
          ? "Passwords did not match"
          : null,
      oldpassword: (value) =>
        value.length < 8 ? "Password should have more than 8 characters" : null,
      newpassword: (value) =>
        value.length < 8 ? "Password should have more than 8 characters" : null,
    },
  });
  return (
    <>
      <Modal
        padding={40}
        opened={props.opened}
        withCloseButton={false}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        closeOnClickOutside={true}
        onClose={props.onClose}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(
              changePassword({
                password: values.oldpassword,
                newPassword: values.newpassword,
              })
            );
          })}
        >
          <Stack>
            <TextInput
              required
              type="password"
              value={form.values.oldpassword}
              label="Old Password"
              onChange={(event) => {
                form.setFieldValue("oldpassword", event.currentTarget.value);
              }}
              error={form.errors.oldpassword}
            />
            <TextInput
              required
              type="password"
              value={form.values.newpassword}
              label="New Password"
              onChange={(event) => {
                form.setFieldValue("newpassword", event.currentTarget.value);
              }}
              error={form.errors.newpassword}
            />
            <TextInput
              required
              type="password"
              value={form.values.repassword}
              label="Confirm Password"
              onChange={(event) => {
                form.setFieldValue("repassword", event.currentTarget.value);
              }}
              error={form.errors.repassword}
            />
            <Group position="center" mt="md">
              <Button loading={isLoading} type="submit">
                Update
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default ChangePassword;
