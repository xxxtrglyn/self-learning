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
  IconCircleCheck,
  IconCircleDashed,
  IconEdit,
  IconCheck,
  IconTrash,
  IconCirclePlus,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";

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
  label: string;
  opened: boolean;
  onClose: () => void;
  data: { label: string; isCompleted: boolean }[];
}> = (props) => {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
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
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} style={{ cursor: "pointer" }} />
          </ThemeIcon>
        }
      >
        {props.data.map((item) => {
          if (item.isCompleted) {
            return (
              <List.Item key={item.label} className={classes.line}>
                {isEditing ? (
                  <TextInput value={item.label} style={{ flex: 1 }} />
                ) : (
                  item.label
                )}
                {isEditing && (
                  <IconTrash color="red" className={classes.delete} />
                )}
              </List.Item>
            );
          } else {
            return (
              <List.Item
                key={item.label}
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCircleDashed size={16} />
                  </ThemeIcon>
                }
              >
                {isEditing ? (
                  <TextInput value={item.label} style={{ flex: 1 }} />
                ) : (
                  item.label
                )}
                {isEditing && (
                  <IconTrash color="red" className={classes.delete} />
                )}
              </List.Item>
            );
          }
        })}
        {isAdding && (
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleDashed size={16} />
              </ThemeIcon>
            }
          >
            <TextInput style={{ flex: 1 }} />
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
