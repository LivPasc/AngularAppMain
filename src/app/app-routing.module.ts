import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { CardDetailsComponent } from './modules/card-details/card-details.component';
import { CardComponent } from './modules/card/card.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { NotificationComponent } from './modules/notification/notification.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DefaultComponent, canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '',
        component: CardComponent,
      },
      {
        path: 'details/:id',
        component: CardDetailsComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [CardDetailsComponent,]
