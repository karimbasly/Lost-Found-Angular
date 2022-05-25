import {Injectable} from "@angular/core";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {User} from "@shared/models/user.model";
import {UserSearch} from "../../home/users/users-search.model";

@Injectable({
  providedIn: 'root',
})
export class UserService{
  static SEARCH = '/search';
  constructor(private httpService: HttpService) {
  }


  create(user:User): Observable<User> {
    return this.httpService
      .successful("User successful Create")
      .post(EndPoints.USERS,user);
  }

  read(email: string): Observable<User> {
    return this.httpService
      .get(EndPoints.USERS + '/' + email);
  }


  update(oldEmail: string, user: User) : Observable<User> {
    return this.httpService
      .successful("User successful Update")
      .put(EndPoints.USERS+'/'+oldEmail,user);

  }

  search(userSearch: UserSearch) : Observable<User[]> {
    return this.httpService
      .paramsFrom(userSearch)
      .get(EndPoints.USERS + UserService.SEARCH);
  }

  readAll() :Observable< User[] > {
    return this.httpService.get(EndPoints.USERS + UserService.SEARCH)
  }

  delete(email: string) : Observable<void> {
    return this.httpService
      .successful("User successful Delete")
      .delete(EndPoints.USERS+'/'+email)

  }
}
