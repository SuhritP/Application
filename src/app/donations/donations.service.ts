import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class DonationsService {
  constructor(private http: HttpClient) {}

  async getDonateFood() {
    return await this.http.get(API_URL + "/donateFoods", {params: { sort: '-_id'}}).toPromise();
  }

  async getDonateFoodById(id: any) {
    return await this.http.get(API_URL + "/donateFoods/" + id).toPromise();
  }

  async setDonateFood(params: any) {
    return await this.http.post(API_URL + "/donateFoods", params).toPromise();
  }
  
  async uploadImage(body:any) {
    return await this.http.post(API_URL + "/donateFoods/uploads", body).toPromise()
  }

  async patchDonateFoodById(id: any, body: any) {
    return await this.http.patch(API_URL + "/donateFoods/" + id, body).toPromise();
  }
}
