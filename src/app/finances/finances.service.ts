import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class FinancesService {
  constructor(private http: HttpClient) {}

  async getFinances() {
    return await this.http.get(API_URL + "/finances").toPromise();
  }

  async getFinancesById(id: any) {
    return await this.http.get(API_URL + "/finances/" + id).toPromise();
  }

  async setFinances(params: any) {
    return await this.http.post(API_URL + "/finances", params).toPromise();
  }

  async patchFinancesById(id: any, body: any) {
    return await this.http.patch(API_URL + "/finances/" + id, body).toPromise();
  }
  
}
