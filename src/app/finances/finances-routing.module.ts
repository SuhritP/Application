import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { FinancesListComponent } from "./finances-list/finances-list.component";
import { FinancesDetailComponent } from "./finances-detail/finances-detail.component";
import { FinancesAddComponent } from "./fiances-add/fiances-add.component";

const routes: Routes = [
  {
    path: '',
    component: FinancesListComponent,
    data: { roles: [] }
  },
  {
    path: 'detail/:id',
    component: FinancesDetailComponent, 
    data: { roles: [] }
  },
  {
    path: 'add',
    component: FinancesAddComponent, 
    data: { roles: [] }
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class FinancesRoutingModule {}
