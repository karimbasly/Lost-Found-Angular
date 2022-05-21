import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {User} from "@shared/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService{
  static  REGISTER ="/register"
  constructor(private httpService: HttpService) {
  }


  create(user:User): Observable<User> {
    return this.httpService
      .post(EndPoints.USERS,user);
  }

  read(email: string): Observable<User> {
    return this.httpService
      .get(EndPoints.USERS + '/' + email);
  }


  update(oldEmail: string, user: User) : Observable<User> {
    return this.httpService.put(EndPoints.USERS+'/'+oldEmail,user);

  }
}
