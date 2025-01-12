import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DonationsService } from '../donations.service';

@Component({
  selector: 'ns-donate-list',
  templateUrl: './donate-list.component.html',
  styleUrls: ['./donate-list.component.scss']
})
export class DonateListComponent implements OnInit {

  donations: any = [
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

  constructor(private donationsService: DonationsService) { }

  async ngOnInit(): Promise<void> {
    this.donations = await this.donationsService.getDonateFood();

    console.log(this.donations);
    
  }

  changeDateFormat(date){
    let moment2 = moment(date).format('YYYY-MM-DD hh:mm');
   return moment2;
  }

}
