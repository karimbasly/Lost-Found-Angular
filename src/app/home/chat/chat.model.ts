import {MessageModel} from "./message.model";

export interface ChatModel{
  id: string;
  sendEmailFrom: string;
  sendEmailTo: string;
  lastMessage?: string;
  //lastMessageDate?: Date ;
  userPhoto?: string;
  userName?: string;
  message1:string;


}
