import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {HomeComponent} from "./home.component";
import {UserComponent} from "./users/user.component";
import {AnnouncementComponent} from "./announcement/announcement.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'user', component: UserComponent,canActivate: [RoleGuardService],data: {roles: [Role.ADMIN]} },
      {path: 'Announcement', component: AnnouncementComponent,canActivate: [RoleGuardService],data:{roles: [Role.ADMIN]} }
      // public
      /*{
        path: 'complaints',
        component: ComplaintsComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {
        path: 'shopping-basket',
        component: ShoppingBasketComponent,
        canActivate: [RoleGuardService],
        data: {roles: [Role.CUSTOMER]}
      },
      {path: 'online-orders', component: OnlineOrdersComponent},
      {path: 'technical-support', component: TechnicalSupportComponent},
      {path: 'customer-points', component: CustomerPointsComponent},
      {path: 'reviews', component: ReviewsComponent},*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
