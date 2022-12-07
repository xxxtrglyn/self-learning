import { TimeControl } from "./timecontrol";

export interface TimeItem {
  id: string;
  amount: number;
  description: string;
  timeControlId?: string;
  timeControl?: TimeControl;
  createdAt?: string;
  updatedAt?: string;
}
