import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {MessageModel} from "./message.model";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {Chat} from "./chat1.model";
import {ChatModel} from "./chat.model";


@Injectable({
  providedIn: 'root',
})
export class ChatService{
  constructor(private httpService: HttpService) {
  }
  message1:MessageModel[]=[
    {text:"hello",senderEmail:"karimsend"},
    {text:"hey",senderEmail:"karimto"},
  ]


chat:Chat={
    id:"1",lastMessage:'hey',userName:"karim",sendFrom:"karimsend",sendTo:"karimto",message:this.message1
}
  create(chat: any):Observable<any> {
    //console.log(message);
    return this.httpService
      .post(EndPoints.CHAT,chat);

  }

  readByUserEmail(userEmail: string, userEmail2: string):Observable<ChatModel[]> {
    return this.httpService.get(EndPoints.CHAT+'/'+userEmail+'/'+userEmail2)

  }
}
