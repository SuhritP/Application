import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  async getRequests() {
    return await this.http.get(API_URL + "/requestFoods", {params: { sort: '-_id'}}).toPromise();
  }

  async getRequestById(id: any) {
    return await this.http.get(API_URL + "/requestFoods/" + id).toPromise();
  }

  async patchRequestById(id: any, body: any) {
    return await this.http.patch(API_URL + "/requestFoods/" + id, body).toPromise();
  }



  async acceptRequest(id: any, body: any) {
    return await this.http.put(API_URL + "/requestFoods/accept/" + id, body).toPromise();
  }


  async upload(body: any) {
    return await this.http.post(API_URL + "/requestFoods/upload", 
      body,{
        headers:{
          "content-type":"application/octet-stream"
        }
      }).toPromise();
  }

  async rejectRequest(id: any, body: any) {
    return await this.http.put(API_URL + "/requestFoods/reject/" + id, body).toPromise();
  }


  async setRequest(params: any) {
    return await this.http.post(API_URL + "/requestFoods", params).toPromise();
  }
}
