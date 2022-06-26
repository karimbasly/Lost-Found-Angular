import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";
import {UserService} from "@shared/services/user.Service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  userEmail :string;
  photo :string;

  constructor(private dialog: MatDialog, private authService: AuthService,private userService:UserService,private router: Router) {


  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.userEmail = this.authService.getEmail();
        if (this.isAuthenticated()) {
          this.userService.read(this.userEmail).subscribe(value => this.photo = value.photo)
          this.router.navigate(['home/Announcement']);
        }
      });
  }


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }


  Profile() {
    this.dialog.closeAll();
    this.userService.read(this.userEmail).subscribe(value =>
       this.dialog.open(registerDialogComponent,{data:value})
    )

  }
}


