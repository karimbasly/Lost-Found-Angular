import {Role} from './role.model';

export interface UserLogin {
  token: string;
  email?: string;
  userName?: string;
  role?: Role;
}
