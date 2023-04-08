import { UserRole } from './user-role.enum';

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}