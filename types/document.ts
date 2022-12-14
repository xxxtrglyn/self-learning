import { Lesson } from "./lesson";
import { TimeItem } from "./timeitem";

export interface Document2 {
  id: string;
  userId: string;
  subjectName: string;
  createdAt?: string;
  updatedAt?: string;
  lessons?: Lesson[];
  timeitems?: TimeItem[];
}
