import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import * as bgHttp from "@nativescript/background-http";
import { path } from "@nativescript/core";
import * as imagepicker from "@nativescript/imagepicker";
import { API_URL } from '../../app.constants';
import { RequestsService } from '../requests.service';
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { ApplicationSettings, ImageSource } from '@nativescript/core';
import { DonationsService } from '~/app/donations/donations.service';

@Component({
  selector: 'ns-request-food',
  templateUrl: './request-food.component.html',
  styleUrls: ['./request-food.component.scss']
})
export class RequestFoodComponent implements OnInit {

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

  public requestFoodForm: FormGroup;

  constructor(private router: RouterExtensions,private donationsService:DonationsService,  private fb: FormBuilder, private requestsService: RequestsService, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.createRequestFoodForm();
  }

  private createRequestFoodForm() {
    this.user = JSON.parse(ApplicationSettings.getString('user'));

    this.requestFoodForm = this.fb.group({
      food_type: ["", [Validators.required]],
      quantity_required: ["", [Validators.required]],
      food_required_date: ["", [Validators.required]],
      transport_details: ["", [Validators.required]],
      food_required_location: ["", [Validators.required]],
      food_image: [""],
      user_id: [""],
      active: true
    });
  }

  async onRequestFood() {

    let data = {
      "food_type": this.requestFoodForm.value.food_type,
      "quantity_required": this.requestFoodForm.value.quantity_required,
      "food_required_date": this.requestFoodForm.value.food_required_date,
      "transport_details": this.requestFoodForm.value.transport_details,
      "food_required_location": this.requestFoodForm.value.food_required_location,
      "food_image": this.requestFoodForm.value.food_image,
      "user_id": "",
      "postedName":this.user?.name,
      "mobile_number": this.user?.phone
    }

    const result: any = await this.requestsService.setRequest(data);
    if(result) {
      this.id = result['_id'];
      this.router.navigate(['/requests'], {transition: {name: 'slideLeft'}})
    }
  }

  onDateChanged(args) {
    this.requestFoodForm.patchValue({
      food_required_date: args.value
    })
  }

  
  public onPick() {
    let context = imagepicker.create({
      mode: "single"
    });
    context
      .authorize()
      .then(() => {
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

          this.requestFoodForm.patchValue({
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
