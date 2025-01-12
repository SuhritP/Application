import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { DonateListComponent } from "./donate-list/donate-list.component";
import { DonateDetailComponent } from "./donate-detail/donate-detail.component";
import { DonateFoodComponent } from "./donate-food/donate-food.component";

const routes: Routes = [
  {
    path: '',
    component: DonateListComponent,
    data: { roles: [] }
  },
  {
    path: 'detail/:id',
    component: DonateDetailComponent, 
    data: { roles: [] }
  },
  {
    path: 'food',
    component: DonateFoodComponent, 
    data: { roles: [] }
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DonationsRoutingModule {}
