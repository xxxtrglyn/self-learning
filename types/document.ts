import { Lesson } from "./lesson";

export interface Document2 {
  id: string;
  userId: string;
  subjectName: string;
  createdAt?: string;
  updatedAt?: string;
  lessons?: Lesson[];
}
