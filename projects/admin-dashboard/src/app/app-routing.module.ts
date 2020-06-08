import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'request',
    pathMatch: 'full',
    loadChildren: () => import('./requests/requests.module').then(module => module.RequestsModule)
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
