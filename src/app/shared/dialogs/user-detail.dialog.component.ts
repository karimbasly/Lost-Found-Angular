import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from "@shared/models/user.model";

@Component({
  templateUrl: 'user-detail.dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class ReadDetailDialogComponent {
  title: string;
  user:User;

  constructor(@Inject(MAT_DIALOG_DATA) data: User) {
    this.title = "User Details "
    this.user = data ? data : {
      email: undefined, familyName: undefined, photo: undefined, location: undefined, mobile: undefined,
      userName: undefined, password: undefined, role: undefined, id: undefined, registrationDate: undefined
    }
  }
}
