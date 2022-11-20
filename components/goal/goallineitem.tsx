import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  createStyles,
  Group,
  List,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
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
import { useForm } from "@mantine/form";

const useStyles = createStyles(() => ({
  edit: {
    translate: 10,
    cursor: "pointer",
  },
  delete: {
    position: "relative",
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
  const form = useForm({
    initialValues: {
      label: item.label ? item.label : "",
    },
    validate: {
      label: (value) =>
        value.length < 2 ? "Label should have least 2 characters" : null,
    },
  });

  const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  useEffect(() => {
    if (isEditing === false) {
      setIsEdit(false);
    }
  }, [isEditing]);

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
        <form
          style={{ width: "100%" }}
          onSubmit={form.onSubmit((values) => {
            console.log("submit 1");

            dispatch(
              updateGoalTodo({
                id: item.id,
                goalId: parentId,
                label: values.label,
                isCompleted: item.isCompleted,
              })
            );
            turnOffEditHandler();
          })}
        >
          <Group>
            {isEditing && isEdit ? (
              <TextInput
                value={form.values.label}
                style={{ flex: 1 }}
                onChange={(event) => {
                  form.setFieldValue("label", event.currentTarget.value);
                }}
                error={form.errors.label}
              />
            ) : (
              <Text style={{ flex: 1 }}>{item.label}</Text>
            )}
            <Group>
              {isEditing && !isEdit && (
                <ThemeIcon size={27} radius="xl" color="yellow">
                  <IconPencil
                    className={classes.delete}
                    onClick={turnOnEditHandler}
                  />
                </ThemeIcon>
              )}
              {isEditing && !isEdit && (
                <ThemeIcon
                  style={{ cursor: "pointer" }}
                  size={27}
                  radius="xl"
                  color="cyan"
                  onClick={() => {
                    dispatch(deleteGoalTodo(item.id));
                  }}
                >
                  <IconTrash />
                </ThemeIcon>
              )}
            </Group>
            <Group>
              {isEditing && isEdit && (
                <ActionIcon type="submit">
                  <ThemeIcon
                    radius="xl"
                    color="green"
                    className={classes.delete}
                  >
                    <IconCheck />
                  </ThemeIcon>
                </ActionIcon>
              )}
              {isEditing && isEdit && (
                <ThemeIcon
                  radius="xl"
                  color="red"
                  className={classes.delete}
                  onClick={turnOffEditHandler}
                >
                  <IconX />
                </ThemeIcon>
              )}
            </Group>
          </Group>
        </form>
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
        <form
          style={{ width: "100%" }}
          onSubmit={form.onSubmit((values) => {
            console.log("submit 2");

            dispatch(
              updateGoalTodo({
                id: item.id,
                goalId: parentId,
                label: values.label,
                isCompleted: item.isCompleted,
              })
            );
            turnOffEditHandler();
          })}
        >
          <Group>
            {isEditing && isEdit ? (
              <TextInput
                value={form.values.label}
                style={{ flex: 1 }}
                onChange={(event) => {
                  form.setFieldValue("label", event.currentTarget.value);
                }}
                error={form.errors.label}
              />
            ) : (
              <Text style={{ flex: 1 }}>{item.label}</Text>
            )}
            <Group>
              {isEditing && !isEdit && (
                <ThemeIcon size={27} radius="xl" color="yellow">
                  <IconPencil
                    className={classes.delete}
                    onClick={turnOnEditHandler}
                  />
                </ThemeIcon>
              )}
              {isEditing && !isEdit && (
                <ThemeIcon
                  style={{ cursor: "pointer" }}
                  size={27}
                  radius="xl"
                  color="cyan"
                  onClick={() => {
                    dispatch(deleteGoalTodo(item.id));
                  }}
                >
                  <IconTrash />
                </ThemeIcon>
              )}
            </Group>
            <Group>
              {isEditing && isEdit && (
                <ActionIcon type="submit">
                  <ThemeIcon
                    radius="xl"
                    color="green"
                    className={classes.delete}
                  >
                    <IconCheck />
                  </ThemeIcon>
                </ActionIcon>
              )}
              {isEditing && isEdit && (
                <ThemeIcon
                  radius="xl"
                  color="red"
                  className={classes.delete}
                  onClick={turnOffEditHandler}
                >
                  <IconX />
                </ThemeIcon>
              )}
            </Group>
          </Group>
        </form>
      </List.Item>
    );
  }

  return <>{lineItem}</>;
};

export default GoalLineItem;
