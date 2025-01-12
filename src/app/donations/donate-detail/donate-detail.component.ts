import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import * as moment from 'moment';
import { DonationsService } from '../donations.service';

@Component({
  selector: 'ns-donate-detail',
  templateUrl: './donate-detail.component.html',
  styleUrls: ['./donate-detail.component.scss']
})
export class DonateDetailComponent implements OnInit {

  donations = [
    {
      "food_type": "Veg",
      "quantity": "5",
      "food_available_date": "Today",
      "transport_details": "Test",
      "_id": 4
    },
    {
      "food_type": "Non veg",
      "quantity": "10",
      "food_available_date": "Tomorrow",
      "transport_details": "Bike",
      "_id": 5
    },
    {
      "food_type": "Idli",
      "quantity": "2",
      "food_available_date": "Tomorrow",
      "transport_details": "Bus",
      "_id": 6
    }
  ];

  id: any = this.route.snapshot.paramMap.get('id');
  donation: any;
  constructor(private route: ActivatedRoute, private router: RouterExtensions, private donationsService: DonationsService) { }

  async ngOnInit(): Promise<void> {
    const result: any = await this.donationsService.getDonateFoodById(this.id);

    console.log(result);
    
    if(result) {
      this.donation = result;
    } else {
      this.donation = this.donations.find(t => t._id == this.id);
    }
  }

  async onAcceptDonation() {
    const result: any = await this.donationsService.patchDonateFoodById(this.id, {active: false});
    if(result) {
      alert('Donated!');
    }
    this.router.navigate(['/home'], {transition: {name: 'slideLeft'}})
  }

  changeDateFormat(date){
    let moment2 = moment(date).format('YYYY-MM-DD hh:mm');
   return moment2;
  }

}
