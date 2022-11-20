import { Goal } from "../types/goal";
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTodo,
  createNewGoal,
  deleteGoal,
  deleteGoalTodo,
  updateGoal,
  updateGoalTodo,
} from "./goal-actions";
import { Todo } from "../types/todo";

let emptyGoal: Goal[] = [];

const initialState = {
  items: emptyGoal,
  totalQuantity: 0,
};

const goalSlice = createSlice({
  name: "goallist",
  initialState: initialState,
  reducers: {
    replaceGoalList(state, action: { type: string; payload: Goal[] }) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewGoal.fulfilled, (state, action) => {
      console.log("success", action.payload);

      state.items.push({
        id: action.payload.id,
        userId: action.payload.userId,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        list: [],
        label: action.payload.title,
      });
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items].filter((goal) => {
          return !action.payload?.find((id) => {
            return goal.id === id;
          });
        }),
      };
    });
    builder.addCase(
      addNewTodo.fulfilled,
      (state, action: { type: string; payload: Todo }) => {
        const index = state.items.findIndex(
          (goal) => goal.id === action.payload.goalId
        );
        state.items[index].list.push(action.payload);
      }
    );
    builder.addCase(
      updateGoalTodo.fulfilled,
      (state, action: { type: string; payload: Todo }) => {
        const indexGoal = state.items.findIndex(
          (goal) => goal.id === action.payload.goalId
        );
        const indexTodo = state.items[indexGoal].list.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.items[indexGoal].list[indexTodo] = action.payload;
      }
    );
    builder.addCase(
      deleteGoalTodo.fulfilled,
      (state, action: { type: string; payload: Todo }) => {
        const indexGoal = state.items.findIndex(
          (goal) => goal.id === action.payload.goalId
        );
        const newList = state.items[indexGoal].list.filter(
          (todo) => todo.id !== action.payload.id
        );
        const newItems = state.items.map((goal, index) => {
          if (index === indexGoal) {
            return { ...goal, list: newList };
          }
          return goal;
        });
        return { ...state, items: newItems };
      }
    );
    builder.addCase(updateGoal.fulfilled, (state, action) => {
      const newItems = [...state.items].map((goal) => {
        if (goal.id === action.payload.id) {
          return { ...goal, label: action.payload.title };
        }
        return goal;
      });
      console.log(newItems);
      return { ...state, items: newItems };
    });
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice;
