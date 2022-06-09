import {MessageModel} from "./message.model";

export class Chat{

  id: string;
  sendFrom: string;
  sendTo: string;
  lastMessage?: string;
  lastMessageDate?: Date ;
  userPhoto?: string;
  userName?: string;
  message:MessageModel[];
}
