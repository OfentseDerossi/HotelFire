import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import {snapShots} from '../../app/Firebase';
import {BookingPage} from '../booking/booking';


/**
 * Generated class for the Room1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room1',
  templateUrl: 'room1.html',
})
export class Room1Page {

db=firebase.firestore();

hotel = [
  {name:'value'},
  {name:'value'}
];
hotels = [];
items;
docId;

room ={} as Room;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.room = this.navParams.data;
    console.log('lets see data', this.navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Room1Page');
    this.room = this.navParams.data;
  }

  gethotels(){
    this.db.collection('hotels').get().then(hotels =>{
      hotels.forEach(doc =>{
        this.hotels.push(doc.data());
        this.docId = doc.id;
      })
    console.log(this.hotels);
    })

  }
  gotohotels(val){
    this.hotels=val;
    this.navCtrl.push('Room1Page',val);
    console.log(val);
  }
  BookingPage(){
    this.navCtrl.push(BookingPage, this.room);
    
  }


}
export interface Room{
  desc : '',
  image : '',
  name : '',
  price : "",
  full_desc:'',
  bathroom:'',
  Amenities:'',
  parking:'',

}
