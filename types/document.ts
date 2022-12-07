import { Lesson } from "./lesson";

export interface Document {
  id: string;
  userId: string;
  subjectName: string;
  createdAt?: string;
  updatedAt?: string;
  lessons?: Lesson[];
}
