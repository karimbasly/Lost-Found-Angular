import {Role} from './role.model';

export interface User {
  token: string;
  email?: string;
  userName?: string;
  role?: Role;
}
