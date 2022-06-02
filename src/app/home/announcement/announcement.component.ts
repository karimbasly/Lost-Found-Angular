import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";
import {AnnouncementService} from "./Announcement.Service";
import {Announcement} from "./announcement-model";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";
import {AnnouncementSearch} from "./announcement-search.model";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";
import {AuthService} from "@core/auth.service";


@Component({
  templateUrl: 'announcement.component.html',
  styleUrls: ['announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcement: Announcement[];
  announcementSearch:AnnouncementSearch;
  keyCategory=[];
  category=Category
  type=Type
  keyType=[];
  admin:boolean;
  constructor(private dialog: MatDialog,private announcementService:AnnouncementService, private authservice:AuthService){
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.resetSearch();
    this.admin=this.authservice.isAdmin();

  }
  ngOnInit(): void {
    this.announcementService.readAll()
      .subscribe(value => {this.announcement=value
        console.log("ele de5el")
        console.log(this.announcement);
      });

  }
  resetSearch(): void {
 this.announcementSearch = {};
  }
  Create() {
    this.dialog.open(AnnouncementDialogComponent);
  }



  read(id:any) {
    this.announcementService.readById(id)
      .subscribe(
        value => this.dialog.open(AnnouncementDetailDialogComponent,{data:value}))
  }




  search() {
    this.announcementService.search(this.announcementSearch)
      .subscribe(value => {this.announcement=value
      console.log('result')
        console.log(value)
        console.log("value to search ")
        console.log(this.announcementSearch);
      });

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


