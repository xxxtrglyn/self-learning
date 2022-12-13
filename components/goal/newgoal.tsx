import {
  Stack,
  Modal,
  TextInput,
  Title,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import React from "react";
import { RootState, useAppDispatch } from "../../store";
import { createNewGoal } from "../../store/goal-actions";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { DatePicker } from "@mantine/dates";

const NewGoal: React.FC<{ opened: boolean; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      start: new Date(),
      end: new Date(),
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      start: (value) =>
        Date.now() - value.getTime() > 86400000
          ? "Start date shouldn't from the past"
          : null,
      end: (value, values) =>
        value.getTime() - values.start.getTime() < 0
          ? "Finish date shouldn't >= today"
          : null,
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
              createNewGoal({
                title: values.title,
                start: values.start.toISOString(),
                end: values.end.toISOString(),
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
              error={form.errors.title}
            />
            <DatePicker
              value={form.values.start}
              label="Start At"
              placeholder="Pick start date"
              onChange={(value) => {
                form.setFieldValue("start", value!);
              }}
              error={form.errors.start}
            />
            <DatePicker
              value={form.values.end}
              label="End At"
              placeholder="Pick end date"
              onChange={(value) => {
                form.setFieldValue("end", value!);
              }}
              error={form.errors.end}
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

export default NewGoal;
