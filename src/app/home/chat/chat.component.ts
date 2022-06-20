import { Component, OnInit } from '@angular/core';

import {ChatService} from "./chat.Service";
import {MessageModel} from "./message.model";
import {AuthService} from "@core/auth.service";
import {ChatModel} from "./chat.model";


@Component({
  selector: 'app-home',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class  ChatComponent implements OnInit{
  chat:ChatModel[]
  chat1:ChatModel
  chatSelected:boolean
  test:boolean[]
  sendFrom:boolean=false
  message1:MessageModel[];
  userEmail:string
  sendtext:string;
  messageSend:MessageModel= new MessageModel();

  constructor(private chatService:ChatService,private authService:AuthService) {
    this.message1 = [
      {text: "hello", senderEmail: "karimsend"},
      {text: "hey", senderEmail: "karimto"},
    ];
    this.chat1 = {
      id: "1", lastMessage: 'hey', sendEmailTo: "karim", sendEmailFrom: "karimsend", message1: this.message1,
    }
    this.test = []
    this.userEmail = this.authService.getEmail();
  }


  ngOnInit(): void {
    this.chatService.readByUserEmail(this.userEmail,this.userEmail)
      .subscribe(value => {this.chat=value
        console.log(this.chat);
        this.chat.map(value1 => {
          if(value1.sendEmailFrom == this.userEmail){
        this.test.push(true)}
          else {this.test.push(false)}
        })
          this.sendFrom=true;
          console.log(this.sendFrom)
        console.log("test")
        console.log(this.test)
        this.chat1.userPhotoFrom=this.chat[0].userPhotoFrom;

      });
  }

/*
  user$ = this.usersService.currentUserProfile$;
  myChats$ = this.chatsService.myChats$;

  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl('');

  messages$: Observable<Message[]> | undefined;

  otherUsers$:any
    //combineLatest([this.usersService.allUsers$, this.user$]).pipe(
    //map(([users, user]) => users.filter((u) => u.uid !== user?.uid))

  users$ = combineLatest([
    this.otherUsers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, searchString]) => {
      return users.filter((u) =>
        u.displayName?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
  );

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$,
  ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value[0])));

  constructor(
    private usersService: UsersService,
    private chatsService: ChatsService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.chatListControl.valueChanges.pipe(
      map((value) => value[0]),
      switchMap((chatId) => this.chatsService.getChatMessages$(chatId)),
      tap(() => {
        this.scrollToBottom();
      })
    );
  }

  createChat(user: ProfileUser) {
    this.chatsService
      .isExistingChat(user.uid)
      .pipe(
        switchMap((chatId) => {
          if (!chatId) {
            return this.chatsService.createChat(user);
          } else {
            return of(chatId);
          }
        })
      )
      .subscribe((chatId) => {
        this.chatListControl.setValue([chatId]);
      });
  }

  sendMessage() {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];
    if (message && selectedChatId) {
      this.chatsService
        .addChatMessage(selectedChatId, message)
        .subscribe(() => {
          this.scrollToBottom();
        });
      this.messageControl.setValue('');
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

 */

  selectedChat(id:string) {
    this.chatSelected = true;
    console.log(id)
    console.log(this.chat)
  }

  sendMessage() {
    this.messageSend.senderEmail="karimsend";
    this.messageSend.text=this.sendtext;
    console.log(this.messageSend);
    this.chat1.message1.push(this.messageSend)
    this.messageSend=new MessageModel();
    this.sendtext=undefined;

  }
}
