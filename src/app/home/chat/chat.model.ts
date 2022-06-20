import {MessageModel} from "./message.model";

export interface ChatModel{
  id: string;
  sendEmailFrom: string;
  sendEmailTo: string;
  lastMessage?: string;
  //lastMessageDate?: Date ;
  userPhotoFrom?: string;
  userPhotoTo?: string;
  userNamesFrom?:string
  userNamesTo?:string
  message1:MessageModel[];


}
