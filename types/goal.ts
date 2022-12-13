import { Todo } from "./todo";

export interface Goal {
  id: string;
  userId: string;
  title: string;
  start: string;
  end: string;
  createdAt?: string;
  updatedAt?: string;
  todos?: Todo[];
}
