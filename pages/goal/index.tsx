import React, { useState } from "react";
import type { NextPage } from "next";
import GoalList from "../../components/goal/goallist";
import MainLayout from "../../components/ui/mainlayout";
import { IconCirclePlus } from "@tabler/icons";
import styled from "@emotion/styled";
import NewGoal from "../../components/goal/newgoal";
const Goal: NextPage = () => {
  const [isShowAddGoalForm, setIsShowAddGoalForm] = useState<boolean>(false);
  const showAddGoalFormHandler = () => {
    setIsShowAddGoalForm(true);
  };
  const hideAddGoalFormHandler = () => {
    setIsShowAddGoalForm(false);
  };

  return (
    <>
      <MainLayout order={1}>
        <GoalList />
        <AddButton>
          <IconCirclePlus
            size={60}
            color="red"
            onClick={showAddGoalFormHandler}
          />
        </AddButton>
      </MainLayout>
      <NewGoal opened={isShowAddGoalForm} onClose={hideAddGoalFormHandler} />
    </>
  );
};

export default Goal;

const AddButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;
