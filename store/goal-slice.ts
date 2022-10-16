import { createSlice } from "@reduxjs/toolkit";
import Goal from "../models/goal";

const initialState = {
  items: [
    {
      id: 1,
      title: "Learn React 2",
      completed: 30,
      total: 100,
      list: [
        {
          id: 5,
          label: "Do this",
          isCompleted: true,
        },
        {
          id: 6,
          label: "Do that",
          isCompleted: false,
        },
      ],
    },
    {
      id: 2,
      title: "Learn Next",
      completed: 25,
      total: 56,
      list: [
        {
          id: 7,
          label: "Do this",
          isCompleted: true,
        },
        {
          id: 8,
          label: "Do that",
          isCompleted: false,
        },
      ],
    },
    {
      id: 3,
      title: "Learn Node",
      completed: 31,
      total: 98,
      list: [
        {
          id: 9,
          label: "Do this",
          isCompleted: true,
        },
        {
          id: 10,
          label: "Do that that",
          isCompleted: true,
        },
      ],
    },
  ],
  totalQuantity: 3,
};

const goalSlice = createSlice({
  name: "goallist",
  initialState: initialState,
  reducers: {
    addNewGoalToList(state, action) {
      const newGoal = new Goal(action.payload);
      state.items.push(newGoal);
    },
    updateGoalTodo(
      state,
      action: {
        type: string;
        payload: {
          id: number;
          goal: { id: number; label: string; isCompleted: boolean };
        };
      }
    ) {
      return {
        ...state,
        items: [...state.items].map((goal) => {
          if (goal.id === action.payload.id) {
            const tmp = goal.list.map((item) => {
              if (item.id === action.payload.goal.id) {
                return { ...action.payload.goal };
              } else {
                return { ...item };
              }
            });
            return { ...goal, list: [...tmp] };
          } else {
            return { ...goal };
          }
        }),
      };
    },
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice;
