import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {userregister} from "@shared/models/user-register.model";

@Injectable({
  providedIn: 'root',
})
export class UserService{
  static  REGISTER ="/register"
  constructor(private httpService: HttpService) {
  }


  create(user:userregister): Observable<userregister> {
    return this.httpService
      .post(EndPoints.USERS,user);
  }
}
