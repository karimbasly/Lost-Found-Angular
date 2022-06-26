import {Component} from "@angular/core";
import {Announcement} from "@shared/models/announcement.model";
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementService} from "@shared/services/Announcement.Service";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";
import {AuthService} from "@core/auth.service";
import {AnnouncementSearch} from "@shared/models/announcement-search.model";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";

@Component({
  templateUrl: 'announcement.component.html',
  styleUrls: ['announcement.component.scss'],
})
export class MyAnnouncementComponent{
  announcement: Announcement[];
  announcementSearch:AnnouncementSearch;
  keyCategory=[];
  category=Category
  type=Type
  keyType=[];
  userEmail:string;
  admin:boolean;
  homepage=true;
  title:string;
  constructor(private matDialog: MatDialog,private announcementService1:AnnouncementService,private authService1:AuthService){
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.title="My announcements"
    this.resetSearch();
  }
  ngOnInit(): void {
    this.admin=this.authService1.isAdmin()
    this.userEmail=this.authService1.getEmail();
    this.announcementService1.readByUserEmail(this.userEmail)
      .subscribe(value => {this.announcement=value
      });

  }
  Create() {
    this.matDialog.open(AnnouncementDialogComponent);
  }
  resetSearch(): void {
    this.announcementSearch = {};}
 search() {
    this.announcementService1.search(this.announcementSearch)
      .subscribe(result => {this.announcement=result});
  }

  read(id:any) {
    this.announcementService1.readById(id)
      .subscribe(
        result => this.matDialog.open(AnnouncementDetailDialogComponent,{data:result}))
  }
  update(id: string) {
    this.announcementService1.readById(id)
      .subscribe(
        result => this.matDialog.open(AnnouncementDialogComponent,{data:result}))

  }

  delete(id: string) {
    this.matDialog.open(CancelYesDialogComponent,
      {
        data: {
          title: 'Are you Sure To Delete This announcement',
        }
      })
      .afterClosed().subscribe(result => {
      if (result) {
        this.announcementService1.delete(id).subscribe(value1 => console.log(value1))

      }
    })

  }
}




