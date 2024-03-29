import {Component, ElementRef, OnInit, ViewChild,} from '@angular/core';

import {ChatService} from "@shared/services/chat.Service";
import {MessageModel} from "@shared/models/message.model";
import {AuthService} from "@core/auth.service";
import {ChatModel} from "@shared/models/chat.model";
import {UserService} from "@shared/services/user.Service";



@Component({
  selector: 'app-home',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],

})
export class  ChatComponent implements OnInit {
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;
  chat:ChatModel[]
  chat1:ChatModel
  chatSelected:boolean
  test:boolean[]
  sendFrom:boolean=false
  userEmail:string
  userName:string
  messageSend:MessageModel= new MessageModel();
  sendText:string
  userPhoto:string

  constructor(private chatService:ChatService,private authService:AuthService,private user:UserService) {
    this.test = []
    this.userEmail = this.authService.getEmail();


  }
  ngOnInit(): void {
    this.getChats()
    this.chatService.refreshSubject.subscribe(()=> {
      this.test=[]
      this.getChats()
    })
  }


  getChats():void{
    this.user.read(this.userEmail).subscribe(value =>{ this.userPhoto=value.photo; this.userName=value.userName})
    this.chatService.readByUserEmail(this.userEmail,this.userEmail)
      .subscribe(value => {
        if(value!=null){
        this.chat=value
        this.chat.sort((a, b) => new Date(b.dateLastMessage).getTime()-  new Date(a.dateLastMessage).getTime() )
        this.chat.forEach(value1 => {
          if(value1.sendEmailFrom == this.userEmail){
            this.test.push(true)}
          else {this.test.push(false)}
        })
        }
        else {
          this.chat=[];
        }
      });
  }
  selectedChat(chat:ChatModel) {
    this.chatSelected = false;
this.chatService.readById(chat.id)
  .subscribe(value =>{
    this.chat1=value
    this.scrollToBottom()
  if(this.chat1.sendEmailFrom==this.userEmail){
    this.sendFrom=true;
  }
  });
    if(this.chat1!=null){
      this.chatSelected = true;
    }
  }

  sendMessage() {
    this.messageSend.senderEmail=this.userEmail;
   this.messageSend.text=this.sendText
    if(this.sendText!=null){
    this.chat1.message.push(this.messageSend)
    this.chatService.sendMessage(this.chat1.id,this.chat1).subscribe(value =>
    {
      this.chat1=value;
      this.scrollToBottom()
    });}
    this.messageSend=new MessageModel();
    this.sendText=undefined;

  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 10);
  }
}
