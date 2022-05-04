import {Injectable} from '@angular/core';
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {AuthService} from "@core/auth.service";


@Injectable({
  providedIn: 'root'
})
export class SharedCustomerPointsService {

  private readonly mobile: string;

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.mobile = this.authService.getMobile()?.toString();
  }

  read(mobile?: string): Observable<any> {
    try {
      return this.httpService
        .get("EndPoints.CUSTOMER_POINTS + '/' + mobile ?? this.mobile");
    } catch (e) {
      return null;
    }
  }
}
