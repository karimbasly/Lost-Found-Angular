import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@env';
import {User} from '@core/user.model';
import {HttpService} from '@core/http.service';
import {Role} from '@core/role.model';
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_CORE+ '/users/token';
  static END_POINT2 = environment.REST_CORE+ '/users/ok';
  private user: User;

  constructor(private httpService: HttpService, private router: Router) {
  }



  login(mobile: number, password: string): Observable<User> {
    return this.httpService.

    authBasic(mobile, password)
      .post(AuthService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken; // {token:jwt} => user.token = jwt
          this.user.email = jwtHelper.decodeToken(jsonToken.token).email;  // secret key is not necessary
          this.user.userName = jwtHelper.decodeToken(jsonToken.token).name;
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          return this.user;
        })
      );
  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(new JwtHelperService().isTokenExpired(this.user.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  untilManager(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER]);
  }

  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.OPERATOR]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }


  getName(): string {
    return this.user ? this.user.userName : '???';
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getEmail() :string{
    return this.user ? this.user.email: '???';



  }
}
