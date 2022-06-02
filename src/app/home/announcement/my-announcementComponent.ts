import {Component} from "@angular/core";
import {Announcement} from "./announcement-model";
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementService} from "./Announcement.Service";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";
import {AuthService} from "@core/auth.service";

@Component({
  templateUrl: 'my-announcement.component.html',
  styleUrls: ['announcement.component.css'],
})
export class MyAnnouncementComponent{
  announcement: Announcement[];
  userEmail:string;
  constructor(private dialog: MatDialog,private announcementService:AnnouncementService,private authService:AuthService){
  }
  ngOnInit(): void {
    this.userEmail=this.authService.getEmail();
    this.announcementService.readByUserEmail(this.userEmail)
      .subscribe(value => {this.announcement=value
        console.log("ele de5el")
        console.log(this.announcement);
      });

  }
  Create() {
    this.dialog.open(AnnouncementDialogComponent);
  }



  read(id:any) {
    this.announcementService.readById(id)
      .subscribe(
        value => this.dialog.open(AnnouncementDetailDialogComponent,{data:value}))
  }
  update(id: string) {
    this.announcementService.readById(id)
      .subscribe(
        value => this.dialog.open(AnnouncementDialogComponent,{data:value}))

  }

  delete(id: string) {
    this.dialog.open(CancelYesDialogComponent,
      {
        data: {
          title: 'Are you Sure To Delete This announcement',
        }
      })
      .afterClosed().subscribe(result => {
      if (result) {
      }
    })

  }
}




