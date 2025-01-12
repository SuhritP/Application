import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { ApplicationSettings } from "@nativescript/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { AuthService } from "../auth.service";

@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public selectedIndex = 0;
  public roles: Array<string> = [
    "NGO",
    "Restaurant",
    "Gated Communities",
    "Function Hall",
    "Others"
  ];

  public loginForm: FormGroup;
  public isLoading = true;

  public passwordSecure = true;
  constructor(
    private authService: AuthService,
    private router: RouterExtensions,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      // email: ["restaurant@gmail.com", [Validators.required, Validators.email]],
      // password: ["rest", [Validators.required, Validators.minLength(2)]],  
      
      // email: ["ngo@gmail.com", [Validators.required, Validators.email]],
      // password: ["ngo", [Validators.required, Validators.minLength(2)]],  
      
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(2)]],
      role: [this.roles[this.selectedIndex]]
    });
  }

  public async onLogin() {
    const result: any = await this.authService.onLogin(this.loginForm.value);
    if (result?.accessToken) {
      // localStorage.setItem('token', result.accessToken);
      ApplicationSettings.setString("token", result.accessToken);
      this.router.navigate(["/home"], {
        clearHistory: true,
        transition: { name: "slideLeft", duration: 500 }
      });
    }
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(
      `Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`
    );
    this.loginForm.patchValue({role: this.roles[args.newIndex]});
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }

}
