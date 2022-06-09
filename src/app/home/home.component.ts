import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";
import {UserService} from "@shared/services/user.Service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  username :string;
  photo :string;

  constructor(private dialog: MatDialog, private authService: AuthService,private userService:UserService) {


  }


  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.username = this.authService.getEmail();
        if (this.isAuthenticated()) {
          this.userService.read(this.username).subscribe(value => this.photo = value.photo)
        }
      });
  }


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }


  Profile() {
    this.dialog.closeAll();
    this.userService.read(this.username).subscribe(value => //console.log(value.id)//
       this.dialog.open(registerDialogComponent,{data:value})
    )

  }
}


