import {Component} from "@angular/core";
import {of} from "rxjs";
import {UserSearch} from "./users-search.model";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "@shared/services/user.Service";
import {User} from "@shared/models/user.model";
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";
import {ReadDetailDialogComponent} from "@shared/dialogs/user-detail.dialog.component";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";


@Component({
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
})
export class UserComponent {
  userSearch:UserSearch;
  title = 'Users management';
  users = of([]);

constructor(private dialog: MatDialog,private userService:UserService) {
  this.resetSearch();
  this.users=this.userService.readAll()
  }


  search(): void {
    this.users = this.userService.search(this.userSearch);
  }

  resetSearch(): void {
    this.userSearch = {};
  }

  createUser() {
  this.dialog.open(registerDialogComponent)

  }

  detailsUser(user:User) {
    this.userService.read(user.email)
      .subscribe(value => this.dialog.open(ReadDetailDialogComponent,{data:value}) )

  }

  updateUser(user:User) {
  this.userService.read(user.email).subscribe(value =>
    this.dialog.open(registerDialogComponent,{data:value})
  );

  }

  deleteUser(user:User) {

  this.dialog.open(CancelYesDialogComponent,
    {
      data: {
        title: 'Are you Sure To Delete This User',
      }
    })
    .afterClosed().subscribe(value => {
      if(value){
        this.userService.delete(user.email).subscribe(value => console.log(value))
      }
  })

  }
}
