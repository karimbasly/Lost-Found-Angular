import { Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";


@Component({
  templateUrl: 'announcement.component.html',
  styleUrls: ['announcement.component.css'],
})
export class AnnouncementComponent {
  url:string="https://material.angular.io/assets/img/examples/shiba1.jpg";

  constructor(private dialog: MatDialog){}


  Create() {
    this.dialog.open(AnnouncementDialogComponent);


  }



  Read() {
    this.dialog.open(AnnouncementDetailDialogComponent);
  }
}


