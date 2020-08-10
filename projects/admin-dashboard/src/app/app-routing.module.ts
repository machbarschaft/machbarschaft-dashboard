import {UserManagementComponent} from './user-management/user-management/user-management.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from './shared/guards/authentication-guard';

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
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(module => module.ResetPasswordModule)
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
