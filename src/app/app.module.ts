import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";

import {HttpInterceptorService  } from "./shared/services/http-interceptor.service";
import {GlobalErrorHandler  } from "./shared/services/global-error-handler";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DatePipe } from "@angular/common";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptHttpClientModule,
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptDateTimePickerModule
  ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
      
  }, 
  GlobalErrorHandler,
  DatePipe
  ]
})
export class AppModule {}
