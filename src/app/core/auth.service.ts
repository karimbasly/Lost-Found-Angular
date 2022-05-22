import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@env';
import {UserLogin} from '@core/userlogin.model';
import {HttpService} from '@core/http.service';
import {Role} from '@core/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_CORE+ '/users/token';
  private user: UserLogin;

  constructor(private httpService: HttpService, private router: Router) {
  }



  login(email: string, password: string): Observable<UserLogin> {
    return this.httpService.
    authBasic(email, password)
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


  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN,Role.CUSTOMER]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }


  getName(): string {
    return this.user ? this.user.userName : undefined;
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getEmail() :string{
    return this.user ? this.user.email: undefined;



  }
}
