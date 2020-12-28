import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from './shared/guards/authentication-guard';
import {environment} from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'help-request',
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
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(module => module.ResetPasswordModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(module => module.UserManagementModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule),
    canActivate: [ AuthenticationGuard ]
  }
];

if (!environment.production) {
  routes.push({
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule)
  })
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
