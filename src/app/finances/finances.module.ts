import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { FinancesRoutingModule } from "./finances-routing.module";

import { FinancesListComponent } from "./finances-list/finances-list.component";
import { FinancesDetailComponent } from "./finances-detail/finances-detail.component";
import { FinancesAddComponent } from "./fiances-add/fiances-add.component";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FinancesListComponent, FinancesDetailComponent, FinancesAddComponent],
  imports: [NativeScriptCommonModule, FinancesRoutingModule, NativeScriptFormsModule, ReactiveFormsModule,  SharedModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FinancesModule {}
