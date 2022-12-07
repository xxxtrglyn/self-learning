import {
  Stack,
  Modal,
  TextInput,
  Title,
  Button,
  LoadingOverlay,
  NumberInput,
} from "@mantine/core";
import React from "react";
import { RootState, useAppDispatch } from "../../../store";
import { createNewTime } from "../../../store/timecontrol-actions";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { DatePicker } from "@mantine/dates";

const NewForm: React.FC<{ opened: boolean; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      time: new Date(),
    },
    validate: {
      title: (value) =>
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
        onClose={props.onClose}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            dispatch(
              createNewTime({
                date: values.time.toISOString(),
              })
            );
            form.reset();
          })}
        >
          <Stack>
            <Title order={2} weight={100} align="center">
              Add new goal
            </Title>
            <TextInput
              label="Title"
              placeholder="Enter title here"
              value={form.values.title}
              onChange={(event) => {
                form.setFieldValue("title", event.currentTarget.value);
              }}
            />
            <DatePicker
              onChange={(value) => {
                form.setFieldValue("time", value!);
              }}
              label="Time"
              value={form.values.time}
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

export default NewForm;
