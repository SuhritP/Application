import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AppService } from "../../services/app.service";

@Component({
  selector: "ns-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.scss"]
})
export class ActionBarComponent implements OnInit {
  @Input() title = "Action Bar";
  @Input() showBackButton = true;
  @Input() showHomeIcon = true;
  @Input() hasMenu = true;

  constructor(
    private appService: AppService,
    private router: RouterExtensions
  ) {}

  ngOnInit(): void {}

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onSideDrawer() {
    this.appService.toggleSideDrawer.next(true);
  }
}
