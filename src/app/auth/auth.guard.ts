import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
// import { ApplicationSettings } from '@nativescript/core';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: RouterExtensions, private route: ActivatedRoute) { }

  canActivate() {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    /* const currentUser = ApplicationSettings.getString("user") ? JSON.parse(ApplicationSettings.getString('user')) : {};
    if (this.route.data.roles && this.route.data.roles.indexOf(currentUser?.role) === -1) {
      // role not authorised so redirect to home page
      this.router.navigate(['/']);
      return false;
    } */
    return true;
  }
  
}
