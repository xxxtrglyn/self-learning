import {
  Group,
  Modal,
  Space,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useRef } from "react";
import { IconCheck, IconX } from "@tabler/icons";
import { useAppDispatch } from "../../store";
import { createNewGoal } from "../../store/goal-actions";

const NewGoal: React.FC<{ opened: boolean; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);
  const addNewGoalHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const enteredTitle = textInputRef.current?.value;
    if (enteredTitle != null) {
      dispatch(createNewGoal({ title: enteredTitle }));
    }
    props.onClose();
  };

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
      <TextInput placeholder="Enter title here" ref={textInputRef} />
      <Space h="md" />
      <Group position="center">
        <ThemeIcon
          color="lime"
          size={30}
          radius="xl"
          style={{ cursor: "pointer" }}
          onClick={addNewGoalHandler}
        >
          <IconCheck size={20} />
        </ThemeIcon>
        <ThemeIcon
          color="red"
          size={30}
          radius="xl"
          style={{ cursor: "pointer" }}
          onClick={props.onClose}
        >
          <IconX size={20} />
        </ThemeIcon>
      </Group>
    </Modal>
  );
};

export default NewGoal;
