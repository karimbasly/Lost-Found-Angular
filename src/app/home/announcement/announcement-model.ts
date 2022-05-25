import {Type} from "@shared/models/type.model";
import {Category} from "@shared/models/category.model";
import {User} from "@shared/models/user.model";

export interface Announcement{
  id:string;
  name:string;
  description:string;
  type:Type;
  category:Category;
  photo?:string;
  location?:string;
  lat?:number;
  lng?:number;
  user:User;


}
