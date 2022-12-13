import {
  Stack,
  Modal,
  TextInput,
  Avatar,
  Button,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import React from "react";
import { RootState, useAppDispatch } from "../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { User } from "../../types/user";
import { adminUpdateUser } from "../../store/auth-actions";

const ProfileDetail: React.FC<{
  opened: boolean;
  onClose: () => void;
  value: User | null;
}> = (props) => {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: props.value?.fullname ? props.value.fullname : "",
      email: props.value?.email ? props.value.email : "",
      id: props.value?.id ? props.value.id : "",
      job: props.value?.job ? props.value.job : "",
      city: props.value?.city ? props.value.city : "",
      phone: props.value?.phone ? props.value.phone : "",
      quotes: props.value?.quotes ? props.value.quotes : "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "name must have at least 2 letters" : null,
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
          onReset={form.onReset}
          onSubmit={form.onSubmit((values) => {
            dispatch(
              adminUpdateUser({
                id: values.id,
                fullname: values.name,
                email: values.email,
                job: values.job,
                city: values.city,
                role: props.value?.role!,
                phone: +values.phone!,
              })
            );
          })}
        >
          <Stack spacing={5}>
            <Group position="center">
              <Avatar
                radius={100}
                size="xl"
                src={props.value?.avatar}
                alt="avatar of user"
              />
            </Group>
            <TextInput
              disabled
              label="ID"
              value={form.values.id}
              onChange={(event) => {
                form.setFieldValue("id", event.currentTarget.value);
              }}
              error={form.errors.id}
            />
            <TextInput
              label="Email"
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue("email", event.currentTarget.value);
              }}
              error={form.errors.email}
            />

            <TextInput
              label="Name"
              value={form.values.name}
              onChange={(event) => {
                form.setFieldValue("name", event.currentTarget.value);
              }}
              error={form.errors.name}
            />
            <TextInput
              label="Job"
              value={form.values.job}
              onChange={(event) => {
                form.setFieldValue("job", event.currentTarget.value);
              }}
              error={form.errors.name}
            />
            <TextInput
              label="City"
              value={form.values.city}
              onChange={(event) => {
                form.setFieldValue("city", event.currentTarget.value);
              }}
              error={form.errors.city}
            />
            <TextInput
              label="Phone"
              value={form.values.phone}
              onChange={(event) => {
                form.setFieldValue("phone", event.currentTarget.value);
              }}
              error={form.errors.city}
            />

            {loading ? (
              <Button disabled>Posting</Button>
            ) : (
              <Button disabled={!form.isValid()} type="submit">
                Update
              </Button>
            )}
          </Stack>
        </form>
        <LoadingOverlay visible={loading} overlayBlur={0} />
      </Modal>
    </>
  );
};

export default ProfileDetail;
