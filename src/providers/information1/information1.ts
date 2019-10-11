import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InformationProvider{

  treatments;
  reservation;

  suites;
  user;
 favourite;

  constructor(public http: HttpClient) {
    console.log('Hello InformationProvider Provider');

  }
  getUser(val) {
    this.user = val;
    console.log('User data in provider: ', this.user);

  }
  returnUser() {
    return this.user;
  }


  storeTreatment(val) {
    this.treatments = val
  }

  storeReservation(val) {
    this.reservation = val
  }

  storePrices(val) {
    this.suites = val
  }

  getFavourite(val) {
    this.favourite = val
  }
  updateBio(){
    return this.user;
  }
}