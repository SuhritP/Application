import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: "home",
    loadChildren: () =>
      import("~/app/home/home.module").then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("~/app/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "requests",
    loadChildren: () => import("~/app/requests/requests.module").then(m => m.RequestsModule),
    canActivate: [AuthGuard]
  },
  {
    path: "donations",
    loadChildren: () => import("~/app/donations/donations.module").then(m => m.DonationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: "finances",
    loadChildren: () => import("~/app/finances/finances.module").then(m => m.FinancesModule),
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
