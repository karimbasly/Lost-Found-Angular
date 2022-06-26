import {MessageModel} from "./message.model";

export interface ChatModel{
  id: string;
  sendEmailFrom: string;
  sendEmailTo: string;
  lastMessage?: string;
  dateLastMessage?: Date ;
  userPhotoFrom?: string;
  userPhotoTo?: string;
  userNamesFrom?:string
  userNamesTo?:string
  message:MessageModel[];


}
