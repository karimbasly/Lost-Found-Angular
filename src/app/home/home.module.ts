import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ProfileComponent} from "./profile/profile.component";
import {UserComponent} from "./users/user.component";
import {AnnouncementComponent} from "./announcement/announcement.component";


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    UserComponent,
    AnnouncementComponent
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
