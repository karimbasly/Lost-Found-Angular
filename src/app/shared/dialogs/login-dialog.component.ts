import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";


@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class  LoginDialogComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {
  }

  login(): void {
    this.auth.login(this.email, this.password).subscribe(
      () => {
        if (this.auth.untilOperator()) {
          //this.router.navigate(['shop']).then().finally(() => this.dialog.closeAll());
          console.log('doneeeeee');
          this.dialog.closeAll()
        } else {
          //this.cartService.getShoppingCart().subscribe();
          this.dialog.closeAll();
        }
      }
    );
  }

  Regiter() :void {
    this.dialog.open(registerDialogComponent)


  }
}
