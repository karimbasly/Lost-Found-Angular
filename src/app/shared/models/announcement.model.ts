import {Type} from "@shared/models/type.model";
import {Category} from "@shared/models/category.model";

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
  userEmail:string;
  userPhoto?:string;
  userName?:string;


}
