import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable, Subject, tap} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {ChatModel} from "@shared/models/chat.model";


@Injectable({
  providedIn: 'root',
})
export class ChatService{
  private refresh= new Subject<void>()
  constructor(private httpService: HttpService) {
  }
  create(chat: any):Observable<any> {
    return this.httpService
      .post(EndPoints.CHAT,chat);

  }

  readByUserEmail(userEmail: string, userEmail2: string):Observable<ChatModel[]> {
    return this.httpService
      .get(EndPoints.CHAT + '/' + userEmail + '/' + userEmail2)

  }



  readById(id: string){
   return this.httpService
     .get(EndPoints.CHAT+ '/' +id);
  }

  sendMessage(id: string, chat: ChatModel) :Observable<ChatModel> {
    return this.httpService.put(EndPoints.CHAT+'/'+id,chat)
      .pipe(
        tap(()=>{
          this.refresh.next();
        })
      )

  }

  get refreshSubject(){
    return this.refresh;
  }
}
