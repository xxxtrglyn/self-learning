import {
  Stack,
  Modal,
  TextInput,
  Title,
  Button,
  LoadingOverlay,
  NumberInput,
  Select,
} from "@mantine/core";
import React from "react";
import { RootState } from "../../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";

const NewSlider: React.FC<{
  opened: boolean;
  onClose: () => void;
  onAdd: (description: string, amount: number, documentId: string) => void;
  value?: { description: string; amount: number; documentId: string };
}> = (props) => {
  const documents = useSelector((state: RootState) => state.document.items);
  const dataSelect = documents.map((doc) => ({
    label: doc.subjectName,
    value: doc.id,
  }));
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      subject: props.value
        ? props.value.documentId
        : documents.length > 0
        ? documents[0].id
        : "",
      description: props.value ? props.value.description : "",
      amount: props.value ? props.value.amount : 0,
    },
    validate: {
      description: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      amount: (value) =>
        value > 720
          ? "Shouldn't learn more than 12 hours"
          : value < 15
          ? "At least 15 minutes"
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
        onClose={props.onClose}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            props.onAdd(values.description, values.amount, values.subject);
            if (!props.value) {
              form.reset();
            }
          })}
        >
          <Stack>
            <Title order={2} weight={100} align="center">
              Add
            </Title>
            <TextInput
              label="Title"
              placeholder="Enter title here"
              value={form.values.description}
              onChange={(event) => {
                form.setFieldValue("description", event.currentTarget.value);
              }}
              error={form.errors.description}
            />
            <Select
              label="Subject"
              data={dataSelect}
              value={form.values.subject}
              onChange={(value) => {
                form.setFieldValue("subject", value!);
              }}
            />
            <NumberInput
              label="Time"
              value={form.values.amount}
              onChange={(value) => {
                form.setFieldValue("amount", value!);
              }}
              min={15}
              max={720}
              step={15}
              error={form.errors.amount}
            />
            {loading ? (
              <Button disabled>Posting</Button>
            ) : (
              <Button disabled={!form.isValid()} type="submit">
                {!props.value ? "Post" : "Update"}
              </Button>
            )}
          </Stack>
        </form>
        <LoadingOverlay visible={loading} overlayBlur={0} />
      </Modal>
    </>
  );
};

export default NewSlider;
