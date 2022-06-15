import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Announcement} from "../announcement/announcement.model";
import {ChatModel} from "./chat.model";
import {MessageModel} from "./message.model";
import {AuthService} from "@core/auth.service";
import {ChatService} from "./chat.Service";


@Component({

  templateUrl: 'send-message.dialog.component.html',
  //styleUrls: ['../../shared/dialogs/dialog.component.scss']
}) //implements OnInit
export class SendMessageDialogComponent {
  title:string;
  chat:ChatModel;
  announcement:Announcement;
  text:string="";
  ownerId:string="";
  message:MessageModel= new MessageModel();
  constructor(@Inject(MAT_DIALOG_DATA) data:Announcement,private dialog:MatDialog,private authService:AuthService,private chatService:ChatService){
    this.title = "Send a message ";
    this.announcement =data ;
    this.message={text:undefined,senderEmail:undefined}
    this.chat={
      message1:undefined,
      id: undefined,
      sendEmailFrom: undefined,
      sendEmailTo: undefined,
      lastMessage:undefined,
      //lastMessageDate:undefined,
      userPhoto:undefined,
      userName: undefined
    }
    //this.message.senderEmail=this.announcement.userEmail;

  }



  sendMessage() {

    this.chat.sendEmailFrom=this.authService.getEmail();
   this.chat.userPhoto=this.announcement.userPhoto;
    this.chat.userName=this.announcement.userName;
    this.chat.sendEmailTo=this.announcement.userEmail;
    //this.ownerId=this.announcement.userName;
    this.message.senderEmail=this.announcement.userName
    this.chat.lastMessage=this.chat.message1
console.log(this.message);
    console.log(this.chat);
    console.log(this.message.text);
    this.chatService.create(this.chat)
     .subscribe(value => {
        console.log(value)
        this.dialog.closeAll()
      });



  }
}
