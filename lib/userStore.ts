// /lib/userStore.ts
export interface User {
  email: string;
  password: string;
  otp: string | null;
  verified: boolean;
}

export const users: User[] = [];
