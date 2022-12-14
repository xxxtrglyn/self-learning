import { Document2 } from "./document";
import { TimeControl } from "./timecontrol";

export interface TimeItem {
  id: string;
  amount: number;
  description: string;
  timeControlId?: string;
  timeControl?: TimeControl;
  documentId?: string;
  document?: Document2;
  createdAt?: string;
  updatedAt?: string;
}
