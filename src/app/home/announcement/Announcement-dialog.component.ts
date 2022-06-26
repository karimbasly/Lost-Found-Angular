import {Component, ElementRef, Inject, ViewChild} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AnnouncementMapDialogComponent} from "./Announcement-map-dialog.component";
import {AnnouncementService} from "@shared/services/Announcement.Service";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";
import {Announcement} from "@shared/models/announcement.model";




@Component({

  templateUrl: 'Announcement-dialog.component.html',
  styleUrls: ['../../shared/dialogs/dialog.component.scss']
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
  oldLocation:string;
  oldLat:number;
  oldLng:number;

  constructor(@Inject(MAT_DIALOG_DATA)data:Announcement ,private dialog:MatDialog,private mapService:AnnouncementService) {
    this.title = data? 'Update Announcement ': 'Create Announcement  ';
    this.oldId = data ? data.id : undefined;
    this.url= data? data.photo:'/assets/images/empty.jpg';
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.announcement=data? data:{
      id:undefined, name:undefined, description:undefined, type:undefined, category:undefined,
      photo: undefined, location:undefined,lng:undefined,lat:undefined,userEmail:undefined,
      userName:undefined,userPhoto:undefined
    }
    this.oldId=data? data.id:undefined;
    this.oldLocation=data? data.location:undefined;
    this.oldLat=data? data.lat:undefined
    this.oldLng=data? data.lng:undefined
    }

  create(): void {
    this.announcement.photo=this.url
    this.mapService.create(this.announcement)
      .subscribe(() => {
        this.dialog.closeAll()
      });
  }

  update(): void {
    if(this.announcement.location!=this.oldLocation &&( this.announcement.lat==this.oldLat) &&(this.announcement.lng==this.oldLng)){
      this.announcement.lat=0.0;
      this.announcement.lng=0.0
    }
    this.announcement.photo = this.url;
    this.mapService.
    update(this.oldId,this.announcement)
      .subscribe(()=>this.dialog.closeAll());

  }

  isCreate(): boolean {
    return this.oldId === undefined;
  }

  onFileSelected(event) {
    if(event.target.files){
      this.selectedFile=event.target.files[0]
      const reader = new FileReader();

      reader.onload=(e:any)=>{
        this.url= e.target.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

  }

  openMap() {
    this.dialog.open(AnnouncementMapDialogComponent).afterClosed()
      .subscribe(() =>{
        this.announcement.location =this.mapService.getPlaceName();
        this.center=this.mapService.getCenter()
        this.announcement.lng=this.center[0];
        this.announcement.lat=this.center[1];
      })


  }

  invalid(): boolean {
      return this.check(this.announcement.location) || this.check(this.announcement.category) || this.check(this.announcement.type)
        || this.check(this.announcement.description) || this.check(this.announcement.name);
    }
  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

}
