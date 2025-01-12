import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { DonationsRoutingModule } from "./donations-routing.module";

import { DonateListComponent } from "./donate-list/donate-list.component";
import { DonateDetailComponent } from "./donate-detail/donate-detail.component";
import { DonateFoodComponent } from "./donate-food/donate-food.component";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DonateListComponent, DonateDetailComponent, DonateFoodComponent],
  imports: [NativeScriptCommonModule, DonationsRoutingModule, NativeScriptFormsModule, ReactiveFormsModule,  SharedModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DonationsModule {}
