import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController, Loading } from 'ionic-angular';
import {PayPage} from '../pay/pay';
import * as firebase from 'firebase';
import { Booking } from '../../app/Models/user';
//import {InformationProvider} from '../../providers/Information/information';
import {EmailValidator} from '../../Validators/email';
import { FormGroup, Validators, FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { query } from '@angular/core/src/render3/instructions';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  db = firebase.firestore();
  ref = firebase.database().ref('bookings/');
  public loginForm: FormGroup; 
  public loading: Loading

  bookings =
  {
    name: "",
    phone: '',
    email: '',
    date1: "",
    date2: "",
    adults: 0,
    children: 0,
    hotelname: "",
    nodays: 0,
    price: 0,
    image: '',
    uid: firebase.auth().currentUser.uid
  };

  booking = {} as Booking;
  data = []
  // price;
  suites;
  users;
  roomDetails = {}
  displayProfile = {}
  bookingForm: FormGroup;
  //infoProvider: any;
  // retrieveData: any;
  loadingCtrl: any;
  hotel: any;
  roomId; 
  datas
  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    private FormsModule: FormsModule, private ReactiveFormsModule: ReactiveFormsModule) {
      
      console.log('check', this.datas);
      
      this.bookingForm = formBuilder.group({  
        date1: [ '', Validators.compose([Validators.required]) ],
        date2: [ '', Validators.compose([Validators.required]) ], 
        number: [ '', Validators.compose([Validators.required]) ], 
        roomName: [ '', Validators.compose([Validators.required])], 
        adults: [ '', Validators.compose([Validators.required]) ],
        nodays: [ '', Validators.compose([Validators.required]) ],
        children: [ '', Validators.compose([Validators.required]) ],
      
    }); 

    this.db.collection("UserInfo").where("uid", "==", firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.empty) {
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // doc.id, " => ",
           this.bookings.name = doc.data().firstname
            this.bookings.phone = doc.data().phone
           this.bookings.email = doc.data().email
            this.bookings.image = doc.data().image
            
 
        });
      }
       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    console.log('The add method called');

    console.log('The add method called');

    let date = new Date();
    let start = new Date(this.bookings.date1);
    let end = new Date(this.bookings.date2);

    const nodays = 1000 * 60 * 60 * 24;
    const diff = end.valueOf() - start.valueOf();
    this.bookings.nodays = Math.floor(diff / nodays);

    if (this.bookings.adults > 2) {
      this.bookings.price = this.bookings.nodays * this.bookings.price * this.bookings.adults
    } else
      this.bookings.price = this.bookings.nodays * this.bookings.price

 


  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    // this.navParams.data = room info
    console.log();
    this.roomDetails = this.navParams.data;

    this.bookings.price = this.navParams.data.price
    this.bookings.hotelname = this.navParams.data.desc

    let date = new Date();
    let start = new Date(this.bookings.date1);
    let end = new Date(this.bookings.date2);

    const nodays = 1000 * 60 * 60 * 24;
    const diff = end.valueOf() - start.valueOf();
    this.bookings.nodays = Math.floor(diff / nodays);

    if (this.bookings.adults > 2) {
      this.bookings.price = this.bookings.nodays * this.bookings.price * this.bookings.adults
    } else
      this.bookings.price = this.bookings.nodays * this.bookings.price

 

    
  }

  createBooking() {

    const user = firebase.auth().currentUser.uid;
    let users = this.db.collection('bookings');


    // let load = this.loadingCtrl.create({
    //   content: 'Loading'
    // });
     this.db.collection('bookings').add(this.bookings).then(res => {
      console.log('UserInfo added');
      
    }).catch(err => {
      console.log('An error happened', err);
      
    })

    let date = new Date();
    let start = new Date(this.bookings.date1);
    let end = new Date(this.bookings.date2);

    const nodays = 1000 * 60 * 60 * 24;
    const diff = end.valueOf() - start.valueOf();
    this.bookings.nodays = Math.floor(diff / nodays);

    if (this.bookings.adults > 2) {
      this.bookings.price = this.bookings.nodays * this.bookings.price * this.bookings.adults
    } else
      this.bookings.price = this.bookings.nodays * this.bookings.price

 

    this.navCtrl.push(PayPage, this.bookings)
    //this.navParams.data (ProfilePage, this.bookings)
  }
  

  retrieveData() {

    let users = this.db.collection('User Profiles');

    // let load = this.loadingCtrl.create({
    //   content: 'Loading'
    // });
    // load.present();

    const db = firebase.firestore()
    const user = firebase.auth().currentUser.uid;

  
    this.db.collection("UserInfo").where("uid", "==", firebase.auth().currentUser.uid)
   .get()
   .then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
           // doc.data() is never undefined for query doc snapshots
           // doc.id, " => ",
           console.log( doc.data().firstname);
           console.log( doc.data().phone);
           console.log( doc.data().email);
           console.log( doc.data().image);

       });
   })
   .catch(function(error) {
       console.log("Error getting documents: ", error);
   });
   console.log('The add method called');

  // PayPage(){
  //   this.navCtrl.push(PayPage);
   }

   
  }
  export interface Bookings{
    name: "",
    phone: '',
    email: '',
    date1: "",
    date2: "",
    adults: 0,
    children: 0,
    hotelname: "",
    nodays: 0,
    price: '',
    image: '',

  }
