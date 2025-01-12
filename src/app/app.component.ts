import { Component, ChangeDetectorRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SideDrawerLocation,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'

import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { ApplicationSettings } from "@nativescript/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { AppService } from "./shared/services/app.service";
import { AuthService } from "./auth/auth.service";
import { HttpLoaderService } from "./shared/services/http-loader.service";
import { registerElement } from '@nativescript/angular';
import { CardView } from '@nstudio/nativescript-cardview';

registerElement('CardView', () => CardView);
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase
  
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;  

  user: any;
  isLoading = true;
  
  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private appService: AppService,
    private ngZone: NgZone,
    private authService: AuthService,
    public httpLoaderService: HttpLoaderService,
	private router: RouterExtensions
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit() {
	
	/*
    this.ngZone.run(()=>{
      let user = JSON.parse(ApplicationSettings.getString('user'));
	  //console.log(user);
	  this.user = user;
            
  });
  */
	console.log("Naveen")
	console.log(ApplicationSettings.getString('user'));
	//let user = JSON.parse(ApplicationSettings.getString('user'));
	//this.user = user;
	this.authService.currentUser.subscribe(data => {
		console.log(data)
		this.user = data;
	})
    console.log("----------------------------------------------------");
    console.log(this.user);
    console.log("----------------------------------------------------");
    
    setTimeout(() => {
      this.isLoading != this.isLoading;
    }, 5000);
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.appService.toggleSideDrawer.subscribe(res => {
      if (this.drawer) {
        this.drawer.showDrawer();
      }
    });
    // this.authService.userLoggedIn.subscribe(res => {
    //   if (res) {
    //     this.user = JSON.parse(ApplicationSettings.getString('user'));
    //     console.log(this.user);
        
    //   }
    // });

  
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  onLogout() {
    ApplicationSettings.clear();
    this.router.navigate(["/auth/login"], { transition: { name: "slideLeft" } });
    this.drawer.closeDrawer();
  }

  ngAfterViewInit() {

    this.drawer = this.drawerComponent.sideDrawer;
    this.drawer.drawerLocation = SideDrawerLocation.Right;
    this._changeDetectionRef.detectChanges();    
  }
}
