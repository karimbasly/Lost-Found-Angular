import {Injectable} from "@angular/core";
import * as mapboxgl from 'mapbox-gl' ;
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {environment} from "@env";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {EndPoints} from "@shared/end-points";
import {Announcement} from "./announcement.model";
import {UserService} from "@shared/services/user.Service";
import {AuthService} from "@core/auth.service";
import {AnnouncementSearch} from "./announcement-search.model";

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  static SEARCH = '/search';
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 40.416906;
  lng = -3.7056721;
  zoom = 3;
  place_name:any

  center:any[];
  username:string
  constructor(private httpService: HttpService,private userService:UserService,private authService:AuthService){
    this.mapbox.accessToken=environment.MAPPK
    this.username=authService.getEmail();
  }

  create(announcement:Announcement): Observable<Announcement> {
   announcement.userEmail=this.authService.getEmail();
   return this.httpService
      .successful("Announcement successful Create")
      .post(EndPoints.ANNOUNCEMENT,announcement);
  }

  buildMap(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]


        });
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl

      });
        geocoder.on('result', ($event) => {
          const {result} = $event;
          //geocoder.clear();
          console.log('*********', result)
          console.log(result.center)
          console.log(result.place_name)
          this.place_name=result.place_name;
          this.center=result.center;
          console.log(this.center[0])
          //this.cbAddress.emit(result);
        })
        resolve({
          map: this.map,
          geocoder
        });

      } catch (e) {
        reject(e);
      }
    });
}
 update(oldId: string, announcement:Announcement) : Observable<Announcement> {
    return this.httpService
      .successful("Announcement successful Update")
      .put(EndPoints.ANNOUNCEMENT+'/'+oldId,announcement);

  }
getcenter(){
    return this.center;
}
  getPlaceName(){
    return this.place_name;
  }

  readAll() {
    return this.httpService

      .get(EndPoints.ANNOUNCEMENT+AnnouncementService.SEARCH)
  }

  search(announcementSearch: AnnouncementSearch) :Observable<Announcement[]>{
    return this.httpService.paramsFrom(announcementSearch)
      .get(EndPoints.ANNOUNCEMENT+AnnouncementService.SEARCH)
  }

  readById(id: string):Observable<any> {
    return this.httpService
      .get(EndPoints.ANNOUNCEMENT+ '/' + id);

  }

  readByUserEmail(userEmail:string) :Observable<Announcement[]> {
    return this.httpService
      .get(EndPoints.ANNOUNCEMENT+'/user/'+userEmail)

  }

  delete(id: string) :Observable<Announcement>{
    return this.httpService
      .successful()
      .delete(EndPoints.ANNOUNCEMENT+'/'+id);

  }
}

