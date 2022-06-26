import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";

export class AnnouncementSearch{
  location?:string
  category?:Category;
  type?:Type;

}
