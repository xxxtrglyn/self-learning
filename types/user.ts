import { Document2 } from "./document";
import { Goal } from "./goal";
import { Note } from "./note";
import { Room } from "./Room";
import { TimeControl } from "./timecontrol";

export interface User {
  id: string;
  fullname?: string | null;
  email: string;
  emailVerified?: string | null;
  avatar?: string | null;
  dob?: string | null;
  phone?: number | null;
  quotes?: string | null;
  city?: string | null;
  job?: string | null;
  createdAt?: string;
  updatedAt?: string;
  goals?: Goal[];
  rooms?: Room[];
  timecontrols?: TimeControl[];
  notes?: Note[];
  documents?: Document2[];
  role: string;
}
