import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {UserComponent} from "./users/user.component";
import {AnnouncementComponent} from "./announcement/announcement.component";
import {AnnouncementDialogComponent} from "./announcement/Announcement-dialog.component";
import {AnnouncementMapDialogComponent} from "./announcement/Announcement-map-dialog.component";
import {AnnouncementDetailDialogComponent} from "./announcement/announcement-detail.dialog.component";
import {MyAnnouncementComponent} from "./announcement/my-announcementComponent";



@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    AnnouncementComponent,
    AnnouncementDialogComponent,
    AnnouncementMapDialogComponent,
    AnnouncementDetailDialogComponent,
    MyAnnouncementComponent
  ],
  entryComponents: [

  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  providers: [

  ]
})
export class HomeModule {

}
