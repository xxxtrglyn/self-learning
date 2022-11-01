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
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store";
import { addNewTodo, updateGoal } from "../../store/goal-actions";
import { Todo } from "../../types/todo";
import GoalLineItem from "./goallineitem";

const useStyles = createStyles(() => ({
  edit: {
    translate: 10,
    transform: "translateY(3px)",
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
    bottom: 7,
    right: 10,
    cursor: "pointer",
  },
}));

const DetailGoal: React.FC<{
  id: string;
  label: string;
  list: Todo[];
  opened: boolean;
  onClose: () => void;
}> = (props) => {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [tit, setTit] = useState<string>(props.label);

  const turnOnEditingHandler = () => {
    setIsEditing(true);
  };
  const turnOffEditingHandler = () => {
    setIsEditing(false);
  };
  const closeHandler = () => {
    turnOffEditingHandler();
    setIsAdding(false);
    props.onClose();
  };

  const addNewTodoHandler = () => {
    const value = inputRef.current?.value;
    if (value) {
      dispatch(addNewTodo({ id: props.id!, label: value }));
      setIsAdding(false);
    }
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
        {!isEditing ? (
          props.label
        ) : (
          <TextInput
            style={{ display: "inline-block", width: "80%" }}
            size="md"
            onChange={(e) => {
              setTit(e.target.value);
            }}
            value={tit}
          />
        )}
        {isEditing ? (
          <IconCheck
            color="teal"
            className={classes.edit}
            size={25}
            onClick={() => {
              if (props.label !== tit) {
                dispatch(updateGoal({ id: props.id, title: tit }));
              }
              turnOffEditingHandler();
            }}
          />
        ) : (
          <IconEdit
            color="red"
            className={classes.edit}
            size={25}
            onClick={turnOnEditingHandler}
            style={isAdding ? { display: "none" } : { display: "inline-block" }}
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
        {props.list.map((item) => (
          <GoalLineItem
            parentId={props.id}
            key={item.id}
            isEditing={isEditing}
            item={item}
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
            <TextInput style={{ flex: 1 }} ref={inputRef} />
            <IconCheck
              color="green"
              className={classes.delete}
              onClick={addNewTodoHandler}
            />
            <IconX
              color="red"
              className={classes.delete}
              onClick={() => {
                setIsAdding(false);
              }}
            />
          </List.Item>
        )}
      </List>
      {!isEditing && (
        <IconCirclePlus
          className={classes.add}
          size={40}
          color="teal"
          onClick={() => {
            setIsAdding(true);
          }}
        />
      )}
    </Modal>
  );
};

export default DetailGoal;
