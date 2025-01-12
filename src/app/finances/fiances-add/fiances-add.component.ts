import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { FinancesService } from '../finances.service';

@Component({
  selector: 'ns-fiances-add',
  templateUrl: './fiances-add.component.html',
  styleUrls: ['./fiances-add.component.scss']
})
export class FinancesAddComponent implements OnInit {

  public financesCreateForm: FormGroup;

  constructor(private router: RouterExtensions, private fb: FormBuilder, private financesService: FinancesService) { }

  ngOnInit(): void {
    this.createFinancesCreateForm();
  }

  private createFinancesCreateForm() {
    this.financesCreateForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      organization: ["", [Validators.required]],
      amount: ["", [Validators.required]]
    });
  }

  async onFinances() {
    const result: any = await this.financesService.setFinances(this.financesCreateForm.value);
    if(result) {
      this.router.navigate(['/home'], {transition: {name: 'slideLeft'}})
    }
  }

}
