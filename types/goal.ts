import { Todo } from "./todo";

export interface Goal {
  id: string;
  userId: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
  list: Todo[];
}
