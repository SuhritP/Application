import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestFoodComponent } from './request-food/request-food.component';
import { RequestListComponent } from './request-list/request-list.component';

const routes: Routes = [
  {
    path: '',
    component: RequestListComponent, 
    data: { roles: [] }
  },
  {
    path: 'food',
    component: RequestFoodComponent, 
    data: { roles: [] }
  },
  {
    path: ':id',
    component: RequestDetailComponent, 
    data: { roles: [] }
  },
  
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class RequestsRoutingModule { }
