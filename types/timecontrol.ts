import { TimeItem } from "./timeitem";

export interface TimeControl {
  id: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  timeitems: TimeItem[];
}
