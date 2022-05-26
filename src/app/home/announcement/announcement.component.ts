import { Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";
import {AnnouncementService} from "./Announcement.Service";
import {Announcement} from "./announcement-model";


@Component({
  templateUrl: 'announcement.component.html',
  styleUrls: ['announcement.component.css'],
})
export class AnnouncementComponent {
  url:string="https://material.angular.io/assets/img/examples/shiba1.jpg";
  announcement: Announcement[];
  constructor(private dialog: MatDialog,private announcementService:AnnouncementService){
 /*this.announcementService.readAll()
   .subscribe(value => {this.announcement=value
     console.log("ele de5el")
     console.log(this.announcement);
   });

  */

  }
   // numberValue1 = Number(this.lat);

  Create() {

    this.dialog.open(AnnouncementDialogComponent);


  }



  Read() {
    this.dialog.open(AnnouncementDetailDialogComponent);
  }
}


