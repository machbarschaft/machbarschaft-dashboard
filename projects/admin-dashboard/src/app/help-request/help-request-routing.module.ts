import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateHelpRequestComponent, HelpRequestComponent, HelpRequestListComponent} from './public-api';

const routes: Routes = [
  {
    path: '',
    component: HelpRequestListComponent
  },
  {
    path: 'create',
    component: CreateHelpRequestComponent
  },
  {
    path: ':id',
    component: HelpRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRequestRoutingModule {

}
