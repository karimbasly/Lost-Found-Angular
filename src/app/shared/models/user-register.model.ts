import {Role} from "@core/role.model";

export interface userregister {
  id: string;
  userName: string;
  familyName: string;
  email: string;
  password: string;
  photo:string;
  role?: Role;
  registrationDate?: Date;
}
