import {
  createStyles,
  List,
  Modal,
  TextInput,
  ThemeIcon,
  Title,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import {
  IconCircleDashed,
  IconSettings,
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
    <>
      <Modal
        opened={props.opened}
        withCloseButton={true}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        closeOnClickOutside={false}
        onClose={closeHandler}
      >
        <Stack>
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
              <ThemeIcon
                radius="xl"
                size={27}
                color="teal"
                className={classes.edit}
                onClick={() => {
                  if (props.label !== tit) {
                    dispatch(updateGoal({ id: props.id, title: tit }));
                  }
                  turnOffEditingHandler();
                }}
              >
                <IconCheck />
              </ThemeIcon>
            ) : (
              <ThemeIcon
                radius="xl"
                className={classes.edit}
                size={28}
                onClick={turnOnEditingHandler}
                color="dark"
              >
                <IconSettings color="white" />
              </ThemeIcon>
            )}
          </Title>
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
                <ThemeIcon
                  style={{ marginLeft: "10px" }}
                  radius="xl"
                  size={27}
                  color="teal"
                  className={classes.delete}
                  onClick={addNewTodoHandler}
                >
                  <IconCheck />
                </ThemeIcon>

                <ThemeIcon
                  style={{ marginLeft: "10px" }}
                  radius="xl"
                  size={27}
                  color="red"
                  className={classes.delete}
                  onClick={() => {
                    setIsAdding(false);
                  }}
                >
                  <IconX />
                </ThemeIcon>
              </List.Item>
            )}
          </List>
          {!isEditing && (
            <Group position="center">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(true);
                }}
                leftIcon={<IconCirclePlus />}
              >
                Add
              </Button>
              {/* <IconCirclePlus
                className={classes.add}
                size={40}
                color="teal"
                onClick={() => {
                  setIsAdding(true);
                }}
              /> */}
            </Group>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default DetailGoal;
