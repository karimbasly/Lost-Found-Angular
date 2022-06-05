import {Component} from "@angular/core";
import {Announcement} from "./announcement-model";
import {MatDialog} from "@angular/material/dialog";
import {AnnouncementService} from "./Announcement.Service";
import {AnnouncementDialogComponent} from "./Announcement-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement-detail.dialog.component";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";
import {AuthService} from "@core/auth.service";
import {AnnouncementSearch} from "./announcement-search.model";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";

@Component({
  templateUrl: 'announcement.component.html',
  styleUrls: ['announcement.component.css'],
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
  constructor(private dialog: MatDialog,private announcementService:AnnouncementService,private authService:AuthService){
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.title="My announcements"
    this.resetSearch();
  }
  ngOnInit(): void {
    this.admin=this.authService.isAdmin()
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
  resetSearch(): void {
    this.announcementSearch = {};}
 search() {
    this.announcementService.search(this.announcementSearch)
      .subscribe(value => {this.announcement=value});
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
        this.announcementService.delete(id).subscribe(value => console.log(value))

      }
    })

  }
}




