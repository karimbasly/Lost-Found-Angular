import {Component, Inject, OnInit} from "@angular/core";
import {Announcement} from "./announcement-model";
import * as mapboxgl from 'mapbox-gl' ;
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({

  templateUrl: 'announcement-detail.dialog.component.html',
  styleUrls: ['../../shared/dialogs/dialog.component.css']
})
export class AnnouncementDetailDialogComponent implements OnInit {
  title: string;
  announcement:Announcement;
  mapbox = (mapboxgl as typeof mapboxgl);
  map1: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat :number;
  lng:number;
  zoom = 15;
  constructor(@Inject(MAT_DIALOG_DATA) data: Announcement){
    this.title = "Announcement Details ";

    this.announcement =data ? data : {
      type:undefined,photo:undefined,location:undefined,id:undefined,userPhoto:undefined,
      userName:undefined,name:undefined,userEmail:undefined,lat:undefined,lng:undefined,
      description:undefined,category:undefined
    }
  }
  ngOnInit(): void {
    if(this.announcement.lat!=0.0 && this.announcement.lng!=0.0){
    this.lat=this.announcement.lat;//35.83333
    this.lng=this.announcement.lng;//10.63333
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


}
