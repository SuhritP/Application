import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  toggleSideDrawer = new BehaviorSubject<any>(null);

  constructor() { }
}
