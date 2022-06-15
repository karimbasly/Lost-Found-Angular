import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {MessageModel} from "./message.model";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class ChatService{
  constructor(private httpService: HttpService) {
  }


  create(chat: any):Observable<any> {
    //console.log(message);
    return this.httpService
      .post(EndPoints.CHAT,chat);

  }
}
