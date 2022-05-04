import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {HomeComponent} from "./home.component";



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
     // {path: 'profile', component: ProfileComponent},
      //{path: 'user', component: UserComponent},
      //{path: 'Announcement', component: AnnouncementComponent}
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
