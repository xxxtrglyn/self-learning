import React, { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import GoalList from "../../components/goal/goallist";
import MainLayout from "../../components/ui/mainlayout";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons";
import styled from "@emotion/styled";
import NewGoal from "../../components/goal/newgoal";
import prisma from "../../lib/prisma";
import { useAppDispatch } from "../../store";
import { goalActions } from "../../store/goal-slice";
import { Goal } from "../../types/goal";
import { getToken } from "next-auth/jwt";
const Goal: NextPage<{ allGoals: Goal[] }> = (props) => {
  const [isShowAddGoalForm, setIsShowAddGoalForm] = useState<boolean>(false);
  const showAddGoalFormHandler = () => {
    setIsShowAddGoalForm(true);
  };
  const hideAddGoalFormHandler = () => {
    setIsShowAddGoalForm(false);
  };

  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const turnOnDeleteModeHandler = () => {
    setIsDeleteMode((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(goalActions.replaceGoalList(props.allGoals));
  }, [dispatch, props.allGoals]);

  return (
    <>
      <MainLayout order={1}>
        <GoalList deleteMode={isDeleteMode} />
        <AddButton>
          <IconCirclePlus
            size={60}
            color="green"
            onClick={showAddGoalFormHandler}
          />
        </AddButton>
        <DeleteButton>
          <IconCircleMinus
            size={60}
            color="red"
            onClick={turnOnDeleteModeHandler}
          />
        </DeleteButton>
      </MainLayout>
      <NewGoal opened={isShowAddGoalForm} onClose={hideAddGoalFormHandler} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req });
  if (token) {
    const goalList = await prisma.goal.findMany({
      where: {
        userId: token?.sub,
      },
    });
    const todos = await prisma.todo.findMany({
      where: {
        goal: {
          userId: token?.sub,
        },
      },
    });
    const transformTodo = todos.map((todo) => {
      return {
        id: todo.id,
        goalId: todo.goalId,
        label: todo.label,
        isCompleted: todo.isCompleted,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt.toDateString(),
      };
    });
    const goalListTransform = goalList.map((goal) => {
      {
        return {
          id: goal.id,
          userId: goal.userId,
          label: goal.title,
          list: transformTodo.filter((todo) => todo.goalId === goal.id),
          createdAt: goal.createdAt.toISOString(),
          updatedAt: goal.updatedAt.toISOString(),
        };
      }
    });
    return {
      props: {
        allGoals: goalListTransform,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
const DeleteButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 100px;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;
