import React from "react";
import {
  Modal,
  Stack,
  Center,
  Title,
  NumberInput,
  Button,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../../store";
import { createNewRoom } from "../../store/room-actions";

const CreateRoom: React.FC<{ opened: boolean; onClose: () => void }> = ({
  opened,
  onClose,
}) => {
  const form = useForm({
    initialValues: {
      roomName: "",
      maxMember: 0,
    },
  });
  const dispatch = useAppDispatch();
  return (
    <Modal
      padding={20}
      opened={opened}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={false}
      onClose={onClose}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(createNewRoom(values.roomName));
        })}
      >
        <Stack p={15}>
          <Center>
            <Title order={2} weight={300}>
              Create new room
            </Title>
          </Center>
          <TextInput
            onChange={(event) => {
              form.setFieldValue("roomName", event.currentTarget.value);
            }}
            label="Room name"
            placeholder="Aa"
            value={form.values.roomName}
          />
          <NumberInput
            onChange={(value) => {
              form.setFieldValue("maxMember", value!);
            }}
            label="Maximum member"
            placeholder="0-99"
            min={0}
            value={form.values.maxMember}
          />
          <Button type="submit">Create</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateRoom;
