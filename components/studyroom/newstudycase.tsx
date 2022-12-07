import {
  Stack,
  Modal,
  NumberInput,
  Title,
  Button,
  LoadingOverlay,
  Select,
  Group,
  FileInput,
} from "@mantine/core";
import React, { useState } from "react";
import { RootState } from "../../store";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconMusic } from "@tabler/icons";
import axios from "axios";

interface Song {
  label: string;
  value: string;
}

const DUMMY_DATA: Song[] = [
  {
    label: "Darwin's Game",
    value: "http://abc.com",
  },
  {
    label: "Darwin's Game 2",
    value: "http://abcd.com",
  },
];

const NewStudyCase: React.FC<{
  opened: boolean;
  onClose: () => void;
  onStart: (value: number) => void;
}> = (props) => {
  const [files, setFiles] = useState<File | null>();
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
            // const x = new FormData();
            // x.append("file", files!);
            // x.append("upload_preset", "eyr7icyv");
            // x.append("cloud_name", "dvmih2q1y");
            // axios.post("https://api.cloudinary.com/v1_1/dvmih2q1y/upload", x);
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
            <Select label="Lesson" data={DUMMY_DATA} style={{ flex: 1 }} />
            <Group>
              <Select label="Music" data={DUMMY_DATA} style={{ flex: 1 }} />
              <FileInput value={files} onChange={setFiles} />
            </Group>
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
