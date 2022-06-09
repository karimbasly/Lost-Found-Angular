import {Component, ElementRef, OnInit, Renderer2, ViewChild,} from "@angular/core";
import {AnnouncementService} from "./Announcement.Service";
import * as mapboxgl from 'mapbox-gl' ;

import {environment} from "@env";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  templateUrl: 'Announcement-map-dialog.component.html',
  styleUrls: ['announcement.component.scss'],
})
export class AnnouncementMapDialogComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  mapbox = (mapboxgl as typeof mapboxgl);

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



  close() {
    this.dialog.close(true)
  }
}
