import {Component, Inject, OnInit} from "@angular/core";
import {Announcement} from "@shared/models/announcement.model";
import * as mapboxgl from 'mapbox-gl' ;
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SendMessageDialogComponent} from "../chat/send-message.dialog.component";
import {AuthService} from "@core/auth.service";

@Component({
  templateUrl: 'announcement-detail.dialog.component.html',
  styleUrls: ['../../shared/dialogs/dialog.component.scss']
})
export class AnnouncementDetailDialogComponent implements OnInit {
  title: string;
  isAdmin:boolean;
  announcementOwner:boolean;
  announcement:Announcement;
  mapbox = (mapboxgl as typeof mapboxgl);
  map1: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat :number;
  lng:number;
  zoom = 15;
  constructor(@Inject(MAT_DIALOG_DATA) data: Announcement,private dialog: MatDialog,private authService:AuthService){
    this.title = "Announcement Details ";
    this.isAdmin=authService.isAdmin();
    this.announcement =data ? data : {
      type:undefined,photo:undefined,location:undefined,id:undefined,userPhoto:undefined,
      userName:undefined,name:undefined,userEmail:undefined,lat:undefined,lng:undefined,
      description:undefined,category:undefined
    }

  }
  ngOnInit(): void {
    this.ownerAnnouncement();
    if(this.announcement.lat!=0.0 && this.announcement.lng!=0.0){
    this.lat=this.announcement.lat;
    this.lng=this.announcement.lng;
    this.buildMap();
    }

  }

  buildMap(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.map1 = new mapboxgl.Map({
          container: 'map1',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]


        });
        const marker = new mapboxgl.Marker()
          .setLngLat([this.lng, this.lat])
          .addTo(this.map1);
        resolve({
          map1: this.map1,
          marker
        });

      } catch (e) {
        reject(e);
      }
    });
  }


  sendMessage() {
    this.dialog.open(SendMessageDialogComponent,{data:this.announcement})

  }
  ownerAnnouncement(){
    this.announcementOwner = this.authService.getEmail() === this.announcement.userEmail;
  }

}
