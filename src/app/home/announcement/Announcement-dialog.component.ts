import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AnnouncementMapDialogComponent} from "./Announcement-map-dialog.component";
import {MapService} from "./map.Service";
import {Category} from "@shared/models/category.model";
import {Type} from "@shared/models/type.model";
import {Announcement} from "./announcement-model";



@Component({

  templateUrl: 'Announcement-dialog.component.html',
  styleUrls: ['../../shared/dialogs/dialog.component.css']
})
export class AnnouncementDialogComponent implements OnInit{
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
  barcode: any;


  constructor(@Inject(MAT_DIALOG_DATA)data:Announcement ,private dialog:MatDialog,private mapService:MapService) {
    this.title="Announcement ";
    this.oldId = data ? data.id : undefined;
    this.url= data? data.photo:'/assets/images/empty.jpg';
    this.keyType=Object.keys(this.type);
    this.keyCategory=Object.keys(this.category);
    this.announcement=data? data:{
      id:undefined, name:undefined, description:undefined, type:undefined, category:undefined,
      photo: undefined, location:undefined,lat:undefined, lng:undefined,user:undefined
    }




    }

  ngOnInit(): void {
    //this.user=

  }

  create(): void {
  }

  update(): void {
    this.announcement.photo=this.url
    console.log("before http")
    console.log(this.announcement)
    this.mapService.create(this.announcement)
      .subscribe(value => {
        console.log("after")
        console.log(value)
      this.dialog.closeAll()
      });
    //console.log(this.barcode);
    //console.log(this.category);

  }

  isCreate(): boolean {
    return this.oldId === undefined;
  }



  closeAudit() {
    this.announcement.photo=this.url
    console.log(this.announcement)

  }
  onFileSelected(event) {
    console.log(event);
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
        //this.mapService.getResult()
        console.log(res)
        this.announcement.location =this.mapService.getPlaceName();
        this.center=this.mapService.getcenter()
        this.announcement.lng=this.center[0];
        this.announcement.lat=this.center[1];
       // console.log(this.mapService.getcenter())
        //console.log(this.mapService.getPlaceName())
      })


  }




}
