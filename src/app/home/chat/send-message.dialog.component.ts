import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Announcement} from "@shared/models/announcement.model";
import {ChatModel} from "@shared/models/chat.model";
import {MessageModel} from "@shared/models/message.model";
import {AuthService} from "@core/auth.service";
import {ChatService} from "@shared/services/chat.Service";
import {Router} from "@angular/router";



@Component({
  templateUrl: 'send-message.dialog.component.html',
})
export class SendMessageDialogComponent {
  title:string;
  chat:ChatModel;
  announcement:Announcement;
  message:MessageModel= new MessageModel();
  constructor(@Inject(MAT_DIALOG_DATA) data:Announcement,private dialog:MatDialog,private authService:AuthService,private chatService:ChatService,private router: Router){
    this.title = "Send a message ";
    this.announcement =data ;
    this.message={text:undefined,senderEmail:undefined}
    this.chat={
      message: [],
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
    this.chat.message.push(this.message);
    this.chat.lastMessage=this.message.text;


   this.chatService.create(this.chat).subscribe(()=> {
     this.router.navigate(['home/messengers']).then(() => {});
     this.dialog.closeAll()
      });

  }
}
