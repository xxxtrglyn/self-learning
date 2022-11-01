import { Card, createStyles, Group, Space, Text } from "@mantine/core";
import React, { useState } from "react";
import { Note } from "../../types/note";
import { IconDots, IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { useAppDispatch } from "../../store";
import { createOrUpdateNote, deleteNote } from "../../store/note-actions";

const useStyles = createStyles(() => ({
  date: {
    position: "absolute",
    top: 10,
    right: 5,
  },
  dots: {
    position: "absolute",
    top: 10,
    right: 5,
    display: "none",
  },
  card: {
    overflow: "unset",
    backgroundColor: "rgba(255,255,0,0.3)",
    height: "80px",
    position: "relative",
    cursor: "pointer",
    "&::after": {
      content: '"."',
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "13px 13px 0 0",
      borderColor: "#736a6a #f8f9fa #f8f9fa #f8f9fa",
    },
    "&:hover": {
      backgroundColor: "rgba(200,255,0,0.3)",
    },
  },
  list: {
    position: "absolute",
    top: 10,
    right: 10,
    listStyle: "none",
    display: "inline-block",
    padding: "10px 0",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    zIndex: 99,
  },
  item: {
    cursor: "pointer",
    padding: "0 10px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  },
}));
const NoteItem: React.FC<{
  isSelected: boolean;
  values: Note;
  onCreateOrUpdate: (id: string) => void;
  onSwitch: (data: string) => void;
}> = ({ values, onSwitch, onCreateOrUpdate, isSelected }) => {
  const { classes } = useStyles();
  const [isSwitched, setIsSwitched] = useState<boolean>(false);
  const [isShowControl, setIsShowControl] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    onSwitch(values.id);
  };

  const deleteNoteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteNote(values.id));
  };

  const transformValue = (value: string) => {
    let strippedString = value.replace(/(<([^>]+)>)/gi, "");
    return strippedString.slice(0, 30);
  };

  const fulldate = new Date(values.updatedAt!);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthByNumber = fulldate.getUTCMonth();

  const date = fulldate.getUTCDate();

  return (
    <>
      <Card
        className={classes.card}
        mb="sm"
        onClick={clickHandler}
        onMouseOver={() => {
          setIsSwitched(true);
        }}
        onMouseLeave={() => {
          setIsSwitched(false);
        }}
        style={
          isSelected
            ? { boxShadow: "-4px -4px 5px rgba(0,0,0,0.3)" }
            : { boxShadow: "none" }
        }
      >
        <Text
          className={classes.date}
          size={10}
          weight={100}
          style={!isSwitched ? { display: "block" } : { display: "none" }}
        >
          {monthNames[monthByNumber]} {date}
        </Text>
        <IconDots
          size={17}
          className={classes.dots}
          style={isSwitched ? { display: "block" } : { display: "none" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsShowControl((prev) => !prev);
          }}
        />
        <Space h={7} />
        <Text size={14}>{transformValue(values.content)}...</Text>
        {isShowControl && (
          <ul className={classes.list}>
            <li
              className={classes.item}
              onClick={(e) => {
                e.stopPropagation();
                onCreateOrUpdate(values.id);
              }}
            >
              <Group position="left">
                <IconDeviceFloppy />
                <Text>Save note</Text>
              </Group>
            </li>
            <li className={classes.item} onClick={deleteNoteHandler}>
              <Group>
                <IconTrash />
                <Text>Delete Note</Text>
              </Group>
            </li>
          </ul>
        )}
      </Card>
    </>
  );
};

export default NoteItem;
