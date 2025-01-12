import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SharedModule } from "../shared/shared.module";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [NativeScriptCommonModule, SharedModule, DropDownModule, AuthRoutingModule, NativeScriptFormsModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
