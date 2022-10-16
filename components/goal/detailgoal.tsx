import {
  createStyles,
  List,
  Modal,
  Space,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconCircleDashed,
  IconEdit,
  IconCheck,
  IconCirclePlus,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";
import GoalLineItem from "./goallineitem";

const useStyles = createStyles(() => ({
  edit: {
    translate: 10,
    cursor: "pointer",
  },
  delete: {
    position: "relative",
    right: -5,
    cursor: "pointer",
  },
  line: {
    position: "relative",
  },
  add: {
    position: "absolute",
    bottom: 5,
    right: 5,
    cursor: "pointer",
  },
}));

const DetailGoal: React.FC<{
  id: number;
  label: string;
  opened: boolean;
  onClose: () => void;
  data: { id: number; label: string; isCompleted: boolean }[];
}> = (props) => {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<
    { id: number; label: string; isCompleted: boolean }[]
  >(props.data);

  const updateSingleTodo = (todoItem: {
    id: number;
    label: string;
    isCompleted: boolean;
  }) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todoItem };
        } else {
          return { ...todo };
        }
      });
    });
  };

  const turnOnAdding = () => {
    setIsAdding(true);
  };
  const turnOffAdding = () => {
    setIsAdding(false);
  };
  const turnOnEditingHandler = () => {
    setIsEditing(true);
  };
  const turnOffEditingHandler = () => {
    setIsEditing(false);
  };
  const closeHandler = () => {
    turnOffEditingHandler();
    turnOffAdding();
    props.onClose();
  };
  return (
    <Modal
      padding={40}
      opened={props.opened}
      withCloseButton={false}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={true}
      onClose={closeHandler}
    >
      <Title order={2} weight={100} align="center">
        {props.label}
        {isEditing ? (
          <IconCheck
            color="teal"
            className={classes.edit}
            size={25}
            onClick={turnOffEditingHandler}
          />
        ) : (
          <IconEdit
            color="red"
            className={classes.edit}
            size={25}
            onClick={turnOnEditingHandler}
          />
        )}
      </Title>
      <Space h="lg" />
      <List
        spacing="xs"
        size="sm"
        center
        styles={{ itemWrapper: { width: "100%" } }}
      >
        {props.data.map((item) => (
          <GoalLineItem
            parentId={props.id}
            key={item.label}
            isEditing={isEditing}
            item={item}
            onUpdate={updateSingleTodo}
          />
        ))}
        {isAdding && (
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleDashed size={16} />
              </ThemeIcon>
            }
          >
            <TextInput style={{ flex: 1 }} />
            <IconCheck color="green" className={classes.delete} />
            <IconX color="red" className={classes.delete} />
          </List.Item>
        )}
      </List>
      {isEditing && (
        <IconCirclePlus
          className={classes.add}
          size={30}
          color="teal"
          onClick={turnOnAdding}
        />
      )}
    </Modal>
  );
};

export default DetailGoal;
