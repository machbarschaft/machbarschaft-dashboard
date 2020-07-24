import { RolesModule } from './roles/roles.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from './shared/guards/authentication-guard';

const routes: Routes = [
  {
    path: 'order',
    loadChildren: () => import('./help-request/help-request.module').then(module => module.HelpRequestModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(module => module.RolesModule),
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(module => module.ResetPasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
