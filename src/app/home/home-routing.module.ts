import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {HomeComponent} from "./home.component";
import {AnnouncementComponent} from "./announcement/announcement.component";
import {UserComponent} from "./users/user.component";
import {MyAnnouncementComponent} from "./announcement/my-announcementComponent";
import {ChatComponent} from "./chat/chat.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.ADMIN]}
      },
      {
        path: 'Announcement',
        component: AnnouncementComponent,
       // canActivate: [RoleGuardService],
        //data:{roles: [Role.ADMIN]}
      },
      {
        path: 'MyAnnouncement',
        component: MyAnnouncementComponent,
       // canActivate: [RoleGuardService],
        //data:{roles: [Role.ADMIN]}
      }     ,
      { path:'messengers',component: ChatComponent}


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
