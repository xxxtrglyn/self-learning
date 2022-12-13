import {
  Stack,
  Modal,
  TextInput,
  Title,
  Button,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import React from "react";
import { RootState, useAppDispatch } from "../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { updateLearnTime } from "../../store/document-actions";

const LogStudyTime: React.FC<{
  opened: boolean;
  onClose: () => void;
  value: number;
}> = (props) => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.ui.loaderOverlay);
  const subject = useSelector((state: RootState) => state.document.items);
  const subjectSelect = subject.map((sub) => ({
    value: sub.id,
    label: sub.subjectName,
  }));
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      id: subject.length ? subject[0].id : "",
    },
  });

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
              updateLearnTime({
                id: values.id,
                learnTime: Math.floor(props.value / 60),
              })
            );
            form.reset();
          })}
        >
          <Stack>
            <Title order={2} weight={100} align="center">
              Log your time
            </Title>
            <TextInput
              label="Your time"
              defaultValue={props.value / 60}
              disabled
            />
            <Select
              data={subjectSelect}
              label="Subject"
              value={form.values.id}
              onChange={(e) => {
                form.setFieldValue("id", e!);
              }}
            />

            {loading ? (
              <Button disabled>Saving your work</Button>
            ) : (
              <Button disabled={!form.isValid()} type="submit">
                Log
              </Button>
            )}
          </Stack>
        </form>
        <LoadingOverlay visible={loading} overlayBlur={0} />
      </Modal>
    </>
  );
};

export default LogStudyTime;
