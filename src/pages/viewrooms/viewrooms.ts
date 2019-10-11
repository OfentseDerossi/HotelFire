import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import {snapShots} from '../../app/Firebase';
import {BookingPage} from '../booking/booking';
import {Login1Page} from '../login1/login1';
import {Room1Page} from '../room1/room1';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ViewroomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewrooms',
  templateUrl: 'viewrooms.html',
})
export class ViewroomsPage {

  db=firebase.firestore();

  hotel = [
  {name: 'value'},
  {name: 'value'}
];
  hotels = [];
  items;
  



  ref = firebase.database().ref('items/');
 
   constructor(public navCtrl: NavController, 
   public navParams: NavParams,
   public alertCtrl: AlertController,
   
   ) {

   this.ref.on('value', resp => {
    this.hotels = snapShots(resp);
      console.log(this.gethotels); 
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewroomsPage');
    this.gethotels()
  }
  gethotels(){
    this.db.collection('hotels').get().then(hotels =>{
      hotels.forEach(doc =>{
        this.hotels.push(doc.data());
      })
    console.log(this.hotels);
    })
}

  gotohotels(val){
    this.hotels=val;
    this.navCtrl.push('Rooom1Page',val);
    console.log(val);
  }

  BookingPage() {
    this.navCtrl.push(BookingPage);
  }
  Login1Page() {
    this.navCtrl.push(Login1Page);
  }

  Room1Page(k){
    console.log("THE HOTEL KEY IS:", k);
    
    this.navCtrl.push(Room1Page, k);
  }
  Viewrooms(){
    this.navCtrl.push(ProfilePage);
  }
  Profile(){
    this.navCtrl.push(ProfilePage)
  }

}
