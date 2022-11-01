export interface Todo {
  id: string;
  goalId: string;
  label: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
