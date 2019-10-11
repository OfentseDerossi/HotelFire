import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HotelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotelProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HotelProvider Provider');
  }

}
