import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

import { RequestsRoutingModule } from './requests-routing.module';
import { SharedModule } from "../shared/shared.module";

import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestFoodComponent } from './request-food/request-food.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RequestDetailComponent, RequestFoodComponent, RequestListComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RequestsModule { }
