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
}
