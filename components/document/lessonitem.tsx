import { Card, Group, Text } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Lesson } from "../../types/lesson";

const LessonItem: React.FC<{
  deleteMode: boolean;
  index: number;
  lesson: Lesson;
  onSelect: (value: number) => void;
  onSet: (value: string) => void;
  onAdd: (id: string) => void;
}> = ({ lesson, onSelect, onSet, index, deleteMode, onAdd }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  useEffect(() => {
    setIsSelected(false);
  }, [deleteMode]);
  return (
    <Group
      style={{ cursor: "pointer", width: "100%" }}
      onClick={
        deleteMode
          ? () => {
              setIsSelected((prev) => !prev);
              onAdd(lesson.id);
            }
          : () => {
              onSelect(index);
              onSet(lesson.content ? lesson.content : "");
            }
      }
    >
      <Card
        radius="md"
        shadow="sm"
        withBorder
        style={
          isSelected && deleteMode
            ? { flex: 1, width: "15vw", backgroundColor: "rgba(255,0,0,0.1)" }
            : { flex: 1, width: "15vw" }
        }
      >
        <Text lineClamp={1}>{lesson.lessonName}</Text>
      </Card>
    </Group>
  );
};

export default LessonItem;
