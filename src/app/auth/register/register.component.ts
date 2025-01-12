import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { ApplicationSettings } from "@nativescript/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { AuthService } from "../auth.service";

@Component({
  selector: "ns-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public selectedIndex = 0;
  public roles: Array<string> = [
    "NGO",
    "Restaurant",
    "Gated Communities",
    "Function Hall",
    "Others"
  ];
  public registerForm: FormGroup;

  others = false;

  public passwordSecure = true;
  constructor(
    private authService: AuthService,
    private router: RouterExtensions,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  private createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: [this.roles[this.selectedIndex]],
      other_role: [""]
    });
  }

  public async onRegister() {
    console.log(this.registerForm.value);
    const result: any = await this.authService.onRegister(this.registerForm.value);
      if(result?.accessToken) {
          ApplicationSettings.setString('token', result.accessToken);
          this.router.navigate(['/home'],{clearHistory: true, transition: {name: 'slideLeft', duration: 500}});
      }
    console.log("asas");
    
    /* this.router.navigate(["/auth/login"], {
      transition: { name: "slideLeft", duration: 500 }
    }); */
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(
      `Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`
    );
    this.registerForm.patchValue({role: this.roles[args.newIndex]});
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }

}
