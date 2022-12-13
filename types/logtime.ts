import { Document2 } from "./document";

export interface LogTime {
  userId: string;
  documentId: string;
  learnTime?: number;
  createdAt?: string;
  updatedAt?: string;
  document?: Document2;
}
