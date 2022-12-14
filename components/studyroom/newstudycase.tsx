import {
  Stack,
  Modal,
  NumberInput,
  Title,
  Button,
  LoadingOverlay,
  Select,
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
      des: "",
    },
    validate: {
      title: (value) => (value < 1 ? "At least one minute" : null),
    },
  });

  const loading = useSelector((state: RootState) => state.ui.loaderOverlay);
  const timeitems = useSelector((state: RootState) => state.time.items).find(
    (item) => new Date(item.date).getDate() === new Date().getDate()
  )?.timeitems;
  const dataSelect = timeitems?.map((timeitem) => ({
    label: timeitem.description!,
    value: timeitem.id!,
  }));
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
            <Select
              label="Label"
              data={dataSelect!}
              placeholder="Select items"
              nothingFound="Nothing found"
              searchable
              creatable
              value={form.values.des}
              onChange={(val) => {
                form.setFieldValue("des", val!);
                form.setFieldValue(
                  "title",
                  timeitems?.find((item) => item.id === val)?.amount!
                );
              }}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                form.setFieldValue("des", query);
                return item;
              }}
            />
            <NumberInput
              min={0}
              label="Time"
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
