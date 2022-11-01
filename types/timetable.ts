import { Timeline } from "./timeline";

export interface Timetable {
  id: string;
  userId: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  timelines: Timeline[];
}
