import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import * as bgHttp from "@nativescript/background-http";
import { path } from "@nativescript/core";
import * as imagepicker from "@nativescript/imagepicker";
import { API_URL } from '../../app.constants';
import { ApplicationSettings, ImageSource } from '@nativescript/core';

import { DonationsService } from "../donations.service";
import * as moment from 'moment';

@Component({
  selector: 'ns-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.scss']
})
export class DonateFoodComponent implements OnInit {

  public imageSrc: any;
  public thumbSize: number = 80;
  public tasks: bgHttp.Task[] = [];
  public events: { eventTitle: string; eventData: any }[] = [];
  private file: string;
  private url: string;
  private counter: number = 0;
  private session: any;
  private id: string;

  user:any
  public donateFoodForm: FormGroup;

  constructor(private router: RouterExtensions, private fb: FormBuilder, private donationsService: DonationsService, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.createDonateFoodForm();
  }

  private createDonateFoodForm() {
    this.user = JSON.parse(ApplicationSettings.getString('user'));

    this.donateFoodForm = this.fb.group({
      food_type: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      food_available_date: ["", [Validators.required]],
      transport_details: ["", [Validators.required]],
      food_image: [""],
      user_id: [""]
    });

  
  }

  async onDonateFood() {

    let data = {
      "food_type": this.donateFoodForm.value?.food_type,
      "quantity": this.donateFoodForm.value?.quantity,
      "food_available_date": this.donateFoodForm.value?.food_available_date,
      "transport_details": this.donateFoodForm.value?.transport_details,
      "food_image": this.donateFoodForm.value?.food_image,
      "mobile_number": this.user?.phone,
      "postedName":this.user?.name,
      "user_id": ""
    }

    
    const result: any = await this.donationsService.setDonateFood(data);
    if(result) {
      this.id = result['_id'];
      alert('Thanks for donation!');
      this.donateFoodForm.reset();
      this.router.navigate(['/donations'], {transition: {name: 'slideLeft'}})
    }
  }

  onDateChanged(args) {
    this.donateFoodForm.patchValue({
      food_available_date: args.value
    })
  }

  
  public onPick() {
    let context = imagepicker.create({
      mode: "single"
    });
    context
      .authorize()
      .then(() => {
        this._ngZone.run(() => {
          this.imageSrc = null;
        });
        return context.present();
      })
      .then(selection => {
        this._ngZone.run(() => {
          ImageSource.fromAsset(selection[0].asset).then(async imageSource => {
            var imageBase64 = imageSource.toBase64String("jpg", 60);

            let data = {
              image : JSON.stringify({
                image: imageBase64,
              })
            }
            
            
            
          let resp:any =  await this.donationsService.uploadImage(data);
          console.log(resp);
          
          let {imagePath} = resp;

          this.donateFoodForm.patchValue({
            food_image: imagePath
          })
          this.imageSrc = imagePath
          });

        });
      })
      .catch(function(e) {
        console.log(e);
      });
  }
  


}
