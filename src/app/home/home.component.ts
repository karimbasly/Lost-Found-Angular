import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';

import {Subscription} from "rxjs";
import {throwPortalOutletAlreadyDisposedError} from "@angular/cdk/portal/portal-errors";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  username = undefined;
  email= undefined;

  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.username = authService.getName();
    this.email=authService.getEmail();

  }


  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.username = this.authService.getName();
        this.email=this.authService.getEmail();
        console.log(this.authService.getEmail());
      });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }


}


