import { Button, Grid, Text, Center } from "@mantine/core";
import React, { useEffect, useState } from "react";
import GoalItem from "./goalitem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { Goal } from "../../types/goal";
import { deleteGoal } from "../../store/goal-actions";
import { openConfirmModal } from "@mantine/modals";

const GoalList: React.FC<{
  deleteMode: boolean;
  onCloseDeleteMode: () => void;
}> = ({ deleteMode, onCloseDeleteMode }) => {
  const data = useSelector((state: RootState) => state.goal.items);
  const [selectedItem, setSelectedItem] = useState<Goal[]>([]);
  const dispatch = useAppDispatch();

  const addToSelectedList = (id: string) => {
    const selected = data.find((item) => item.id === id);
    setSelectedItem((prevList) => {
      return prevList.concat(selected!);
    });
  };

  const removeFromSelectedList = (id: string) => {
    setSelectedItem((prevList) => {
      return prevList.filter((goal) => goal.id !== id);
    });
  };

  const deleteHandler = async () => {
    const ids = selectedItem.reduce((arr: string[], cur) => {
      return arr.concat(cur.id);
    }, []);
    await dispatch(deleteGoal(ids));
    setSelectedItem([]);
  };

  const openModal = () =>
    openConfirmModal({
      title: "Delete this goal ?",
      children: <Text size="sm">This goal will be delete permanently ?</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm() {
        deleteHandler();
        onCloseDeleteMode();
      },
    });

  useEffect(() => {
    if (!deleteMode) {
      setSelectedItem([]);
    }
  }, [deleteMode]);

  const list = data.map((item) => (
    <Grid.Col span={4} key={item.id}>
      <GoalItem
        {...item}
        deleteMode={deleteMode}
        onAdd={addToSelectedList}
        onRemove={removeFromSelectedList}
      />
    </Grid.Col>
  ));
  return (
    <Grid m={0} p={0} style={{ flex: 1 }}>
      {deleteMode && (
        <Grid.Col span={12} style={{ backgroundColor: "white" }}>
          <Center>
            <Text>
              Select these GOALS you want to DELETE and click DELETE BUTTON,{" "}
              <Text color="red" style={{ display: "inline" }}>
                {selectedItem.length}
              </Text>
              <Text style={{ display: "inline" }}> selected goal</Text>
              <Button
                style={{ display: "block", margin: "0 auto" }}
                color="red"
                onClick={openModal}
              >
                Delete
              </Button>
            </Text>
          </Center>
        </Grid.Col>
      )}
      {list}
    </Grid>
  );
};

export default GoalList;
