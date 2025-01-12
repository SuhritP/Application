import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApplicationSettings, ImageSource } from '@nativescript/core';

import { RequestsService } from "../requests.service";

@Component({
  selector: 'ns-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  requests: any = [
    {
      "_id": "1",
      "food_type": "string",
      "quantity_required": 2,
      "food_required_date": "string",
      "transport_details": "string",
      "food_required_location": "string",
      "user_id": 1
    }
  ];

  constructor(private requestsService: RequestsService,
              private datePipe : DatePipe) { }

  async ngOnInit(): Promise<void> {
    this.requests = await this.requestsService.getRequests();
    console.log(this.requests);
    let user = JSON.parse(ApplicationSettings.getString('user'));
    console.log(user);
    
  }


  changeDateFormat(date){
    let moment2 = moment(date).format('YYYY-MM-DD hh:mm');
    
   return moment2;
  }
}
