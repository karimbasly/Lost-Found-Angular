import {Component, ElementRef, OnInit, Renderer2, ViewChild,} from "@angular/core";
import {AnnouncementService} from "./Announcement.Service";
import * as mapboxgl from 'mapbox-gl' ;

import {environment} from "@env";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  templateUrl: 'Announcement-map-dialog.component.html',
  styleUrls: ['announcement.component.css'],
})
export class AnnouncementMapDialogComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat =35.83333;
  lng = 10.63333;
  zoom = 3;
  place_name:string
  center:string[];

constructor(private renderer2:Renderer2, private mapService:AnnouncementService, private dialog: MatDialogRef<AnnouncementMapDialogComponent>) {
  this.mapbox.accessToken=environment.MAPPK
}


  ngOnInit(): void {
    this.mapService.buildMap()
      .then(({geocoder, map}) => {

        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        );

        console.log('*** TODO BIEN *****');
      })
      .
        catch((err) => {
          console.log('******* ERROR ******', err);
        });

      }

  buildMap(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom, //15
          center: [this.lng, this.lat]


        });
        //console.log(this.center[0])
        const marker = new mapboxgl.Marker()
          .setLngLat([this.lng, this.lat])
          .addTo(this.map);
        resolve({
          map: this.map,
          marker

        });

      } catch (e) {
        reject(e);
      }
    });
  }

  close() {
    this.dialog.close(true)
  }
}
