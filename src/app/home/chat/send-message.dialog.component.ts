import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Announcement} from "../announcement/announcement.model";
import {ChatModel} from "./chat.model";
import {MessageModel} from "./message.model";
import {AuthService} from "@core/auth.service";
import {ChatService} from "./chat.Service";


@Component({
  templateUrl: 'send-message.dialog.component.html',
})
export class SendMessageDialogComponent {
  title:string;
  chat:ChatModel;
  announcement:Announcement;
  message:MessageModel= new MessageModel();
  constructor(@Inject(MAT_DIALOG_DATA) data:Announcement,private dialog:MatDialog,private authService:AuthService,private chatService:ChatService){
    this.title = "Send a message ";
    this.announcement =data ;
    this.message={text:undefined,senderEmail:undefined}
    this.chat={
      message1: [],
      id: undefined,
      sendEmailFrom: undefined,
      sendEmailTo: undefined,
      lastMessage:undefined,
      userNamesTo:undefined,
      userPhotoFrom:undefined,
      userPhotoTo:undefined,
      userNamesFrom: undefined
    }

  }



  sendMessage() {

    this.chat.sendEmailFrom=this.authService.getEmail();
   this.chat.userPhotoTo=this.announcement.userPhoto;
    this.chat.userNamesTo=this.announcement.userName;
    this.chat.sendEmailTo=this.announcement.userEmail;
    this.message.senderEmail=this.authService.getEmail();
    this.chat.message1.push(this.message);
    this.chat.lastMessage=this.message.text;
    console.log(this.chat);

   this.chatService.create(this.chat).subscribe(value => {
       console.log(value)
     this.dialog.closeAll()
      });





  }
}
