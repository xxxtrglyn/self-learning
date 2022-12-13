import {
  Stack,
  Modal,
  NumberInput,
  Title,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import React from "react";
import { RootState } from "../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";

const NewStudyCase: React.FC<{
  opened: boolean;
  onClose: () => void;
  onStart: (value: number) => void;
}> = (props) => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: 0,
    },
    validate: {
      title: (value) => (value < 1 ? "At least one minute" : null),
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
            props.onStart(values.title);
            form.reset();
            props.onClose();
          })}
        >
          <Stack>
            <Title order={2} weight={100} align="center">
              LEARN NOW
            </Title>
            <NumberInput
              min={0}
              label="Time"
              placeholder="Enter title here"
              value={form.values.title}
              onChange={(value) => {
                form.setFieldValue("title", value!);
              }}
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

export default NewStudyCase;
