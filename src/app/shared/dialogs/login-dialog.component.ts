import {Component} from '@angular/core';
import {AuthService} from '@core/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";


@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class  LoginDialogComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  login(): void {
    this.auth.login(this.email, this.password).subscribe(
      () => {
        if (this.auth.untilOperator()) {
          this.dialog.closeAll()
        } else {
          this.dialog.closeAll();
        }
      }
    );
  }

  register() :void {
    this.dialog.open(registerDialogComponent)


  }
}
