import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { ApplicationSettings } from "@nativescript/core";

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: any;
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
	this.user = JSON.parse(ApplicationSettings.getString('user'));
	//this._changeDetectionRef.detectChanges();
  }

}
