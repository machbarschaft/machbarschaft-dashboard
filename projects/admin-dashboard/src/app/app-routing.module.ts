import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from './shared/guards/authentication-guard';

const routes: Routes = [
  {
    path: 'order',
    loadChildren: () => import('./orders/orders.module').then(module => module.OrdersModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'registration',
    pathMatch: 'full',
    loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
