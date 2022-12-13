import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";
import { Todo } from "../types/todo";

interface goalForm {
  title: string;
  start: string;
  end: string;
}

interface todoForm {
  id: string;
  label: string;
}

export const createNewGoal = createAsyncThunk(
  "goal/create",
  async (goal: goalForm, thunkApi) => {
    try {
      const response = await BaseURL.post("/api/goals", goal);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goal/delete",
  async (list: string[], thunkApi) => {
    try {
      const response = await BaseURL.post("api/goals/delete-request", list);
      return list;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "goal/todo/add",
  async (todo: todoForm) => {
    try {
      const response = await BaseURL.post("api/goals/todos", todo);
      return response.data;
    } catch {
      console.log("some err occur");
    }
  }
);

export const updateGoalTodo = createAsyncThunk(
  "goal/todo/update",
  async (todo: Todo) => {
    try {
      const response = await BaseURL.patch(`api/goals/todos/${todo.id}`, {
        label: todo.label,
        isCompleted: todo.isCompleted,
      });
      return response.data;
    } catch {
      console.log("some err occur");
    }
  }
);

export const deleteGoalTodo = createAsyncThunk(
  "goal/todo/delete",
  async (id: string) => {
    try {
      const response = await BaseURL.delete(`api/goals/todos/${id}`);
      return response.data;
    } catch {
      console.log("some err occur");
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goal/update",
  async (data: { id: string; title: string }) => {
    try {
      const response = await BaseURL.patch(`api/goals/${data.id}`, {
        title: data.title,
      });
      return response.data;
    } catch {
      console.log("some err occur");
    }
  }
);
