import {Component, ElementRef, Inject, ViewChild} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AnnouncementMapDialogComponent} from "./Announcement-map-dialog.component";
import {AnnouncementService} from "./Announcement.Service";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";
import {Announcement} from "./announcement-model";




@Component({

  templateUrl: 'Announcement-dialog.component.html',
  styleUrls: ['../../shared/dialogs/dialog.component.css']
})
export class AnnouncementDialogComponent {
  @ViewChild('code', {static: true}) private elementRef: ElementRef;
  title:string;
  oldId:string;
  url:string;
  keyCategory=[];
  category=Category
  type=Type
  keyType=[];
  announcement:Announcement;
  center=[]
  selectedFile:File=null;
  placeName: string="";
  username:string

  constructor(@Inject(MAT_DIALOG_DATA)data:Announcement ,private dialog:MatDialog,private mapService:AnnouncementService) {
    this.title="Announcement ";
    this.oldId = data ? data.id : undefined;
    this.url= data? data.photo:'/assets/images/empty.jpg';
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.announcement=data? data:{
      id:undefined, name:undefined, description:undefined, type:undefined, category:undefined,
      photo: undefined, location:undefined,lng:undefined,lat:undefined,userEmail:undefined,
      userName:undefined,userPhoto:undefined

    }
    }

  create(): void {
    this.announcement.photo=this.url
    this.mapService.create(this.announcement)
      .subscribe(value => {
        console.log(value)
        this.dialog.closeAll()
      });
  }

  update(): void {

  }

  isCreate(): boolean {
    return this.oldId === undefined;
  }



  closeAudit() {
    this.announcement.photo=this.url
    console.log(this.announcement)

  }
  onFileSelected(event) {
    if(event.target.files){
      this.selectedFile=event.target.files[0]
      var reader = new FileReader();

      reader.onload=(e:any)=>{
        this.url= e.target.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

  }

  openMap() {
    this.dialog.open(AnnouncementMapDialogComponent).afterClosed()
      .subscribe(res =>{
        this.announcement.location =this.mapService.getPlaceName();
        this.center=this.mapService.getcenter()
        this.announcement.lng=this.center[0];
        this.announcement.lat=this.center[1];
      })


  }




}
