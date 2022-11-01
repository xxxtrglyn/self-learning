import React, { useState } from "react";
import { createStyles, List, Text, TextInput, ThemeIcon } from "@mantine/core";
import {
  IconCircleDashed,
  IconTrash,
  IconPencil,
  IconCheck,
  IconCircleCheck,
  IconX,
} from "@tabler/icons";
import { useAppDispatch } from "../../store";
import { deleteGoalTodo, updateGoalTodo } from "../../store/goal-actions";

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
const GoalLineItem: React.FC<{
  parentId: string;
  item: { id: string; label: string; isCompleted: boolean };
  isEditing: boolean;
}> = ({ parentId, item, isEditing }) => {
  const { classes } = useStyles();
  const [textInput, setTextInput] = useState<string>(item.label);
  const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const turnOnEditHandler = () => {
    setIsEdit(true);
  };

  const turnOffEditHandler = () => {
    setIsEdit(false);
  };

  const dispatch = useAppDispatch();

  const checkToggleHandler = () => {
    dispatch(
      updateGoalTodo({
        id: item.id,
        goalId: parentId,
        label: item.label,
        isCompleted: !item.isCompleted,
      })
    );
  };

  let lineItem;

  if (item.isCompleted) {
    lineItem = (
      <List.Item
        key={item.label}
        className={classes.line}
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck
              size={16}
              style={{ cursor: "pointer" }}
              onClick={checkToggleHandler}
            />
          </ThemeIcon>
        }
      >
        {isEdit ? (
          <TextInput
            value={textInput}
            style={{ flex: 1 }}
            onChange={textChangeHandler}
          />
        ) : (
          <Text style={{ flex: 1 }}>{item.label}</Text>
        )}
        {isEditing && !isEdit && (
          <IconPencil
            color="violet"
            className={classes.delete}
            onClick={turnOnEditHandler}
          />
        )}
        {isEditing && isEdit && (
          <IconCheck
            color="green"
            className={classes.delete}
            onClick={() => {
              if (textInput) {
                dispatch(
                  updateGoalTodo({
                    id: item.id,
                    goalId: parentId,
                    label: textInput,
                    isCompleted: item.isCompleted,
                  })
                );
              }
              turnOffEditHandler();
            }}
          />
        )}
        {isEditing && isEdit && (
          <IconX
            color="red"
            className={classes.delete}
            onClick={turnOffEditHandler}
          />
        )}
        {isEditing && !isEdit && (
          <IconTrash
            color="red"
            className={classes.delete}
            onClick={() => {
              dispatch(deleteGoalTodo(item.id));
            }}
          />
        )}
      </List.Item>
    );
  } else {
    lineItem = (
      <List.Item
        key={item.label}
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed
              size={16}
              style={{ cursor: "pointer" }}
              onClick={checkToggleHandler}
            />
          </ThemeIcon>
        }
      >
        {isEdit ? (
          <TextInput
            value={textInput}
            style={{ flex: 1 }}
            onChange={textChangeHandler}
          />
        ) : (
          <Text style={{ flex: 1 }}>{item.label}</Text>
        )}
        {isEditing && !isEdit && (
          <IconPencil
            color="violet"
            className={classes.delete}
            onClick={turnOnEditHandler}
          />
        )}
        {isEditing && isEdit && (
          <IconCheck
            color="green"
            className={classes.delete}
            onClick={() => {
              if (textInput) {
                dispatch(
                  updateGoalTodo({
                    id: item.id,
                    goalId: parentId,
                    label: textInput,
                    isCompleted: item.isCompleted,
                  })
                );
                turnOffEditHandler();
              }
            }}
          />
        )}
        {isEditing && isEdit && (
          <IconX
            color="red"
            className={classes.delete}
            onClick={turnOffEditHandler}
          />
        )}
        {isEditing && !isEdit && (
          <IconTrash
            color="red"
            className={classes.delete}
            onClick={() => {
              dispatch(deleteGoalTodo(item.id));
            }}
          />
        )}
      </List.Item>
    );
  }

  return <>{lineItem}</>;
};

export default GoalLineItem;
