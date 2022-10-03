import {
  Group,
  Modal,
  Space,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React from "react";
import { IconCheck, IconX } from "@tabler/icons";

const NewGoal: React.FC<{ opened: boolean; onClose: () => void }> = (props) => {
  return (
    <Modal
      padding={20}
      opened={props.opened}
      withCloseButton={false}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={true}
      onClose={props.onClose}
    >
      <Title order={2} weight={100} align="center">
        Add new goal
      </Title>
      <Space h="md" />
      <TextInput placeholder="Enter title here" />
      <Space h="md" />
      <Group position="center">
        <ThemeIcon
          color="lime"
          size={30}
          radius="xl"
          style={{ cursor: "pointer" }}
        >
          <IconCheck size={20} />
        </ThemeIcon>
        <ThemeIcon
          color="red"
          size={30}
          radius="xl"
          style={{ cursor: "pointer" }}
        >
          <IconX size={20} />
        </ThemeIcon>
      </Group>
    </Modal>
  );
};

export default NewGoal;
