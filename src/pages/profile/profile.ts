import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/auth';
import {Login1Page} from '../login1/login1'

import { WelcomePage } from '../welcome/welcome';
import { ViewroomsPage } from '../viewrooms/viewrooms';
import { Profile } from '../../app/Models/profile';
import { EditPage } from '../edit/edit';
import { HotelmainPage } from '../hotelmain/hotelmain';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ProfileProvider} from '../../providers/profile/profile'
import { Camera, CameraOptions } from '@ionic-native/camera';
//import {InformationProvider} from '../../providers/Information1/information1';



// /**
//  * Generated class for the ProfilePage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  




  // userss = {
  //   fullname: "",
  //   phone: '',
  //   totalAmount:0,
  //   email: '',
  //   numberofdays:'',
  //   roomtype: '',
  //   image: ''
    
  // }
  someProperty = false;
  // show the profile is it got retrieved
  isProfile = false;
  db = firebase.firestore();
  text: string;

  uid;

    loginForm: FormGroup;

    profiles = {
    uid: firebase.auth().currentUser.uid,
    // bio: "",
    fullname: "",
    phone: '',
    totalAmount:'',
    email: '',
    numberofdays:'',
    roomtype: '',
    image: ''
    
  };

  validation_messages = {
    'fullname': [
      {type: 'required', message: 'fullname is required.'},
   
    ],
  
   'email': [
    {type: 'required', message: 'email is valid.'},
    {type: 'minlength', message: 'email is required.'},
​
  ],
  'phone': [
    {type: 'required', message: 'phone is required.'},
    {type: 'minlength', message: 'phone must be atleast 10 char or more.'},
    {type: 'maxlength', message: 'phone must be less than 10 char or less'},
  ],
}

//
  profileForm: FormGroup
  profileImage: string;
  imageSelected = false;
  isuploaded = false;
  isuploading = false;
  uploadprogress = 0;
  

  data = [];
  items;


  profile = {} as Profile;

  showComp = false;
  users
  displayBooking = [];
  favourite;
  bookingsId: any;
  // forms: any;
  

  constructor(public popoverCtrl: PopoverController, public forms: FormBuilder,  public camera: Camera, public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {

    
    this.loginForm = this.forms.group({
      // image: new FormControl(this.businessdata.image, Validators.compose([Validators.required])),
      fullname: new FormControl(this.profiles.fullname, Validators.compose([Validators.required])),
      
     
      email: new FormControl(this.profiles.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      phone: new FormControl(this.profiles.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
     
     
      
    })


   this.bookingsId = this.navParams.data;
    this.db.collection("bookings").where("uid", "==", firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.empty) {
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // doc.id, " => ",
          this.profiles.fullname = doc.data().name
          this.profiles.phone = doc.data().phone
          this.profiles.email = doc.data().email
          this.profiles.image = doc.data().image
          this.profiles.totalAmount = doc.data().price
           this.profiles.numberofdays = doc.data().nodays
          this.profiles.roomtype = doc.data().hotelname
        });
      }
       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    console.log('The add method called');

  }
  ionViewDidLoad() {

    this.profile.fullname = this.navParams.data.name
    this.profile.email = this.navParams.data.email
    this.profile.phone = this.navParams.data.phone
    this.profile.image = this.navParams.data.image
    this.profile.totalAmount = this.navParams.data.price
    
   

    
    //console.log('Favourite Room', this.infoProvider.favourite);
  }
  checkLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        // go foward
      } else {
        // stay here
      }
    })
  }
  // async presentPopover(myEvent) {
  //   const popover = await this.popoverCtrl.create(PopoverComponent);
  //   popover.present({
  //     ev: myEvent 
  //   });
  // }

  takePhoto(sourcetype: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((captureDataUrl) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let imageUploaded = 'data:image/jpeg;base64,' + captureDataUrl;
      console.log(imageUploaded);
      
      this.profiles.image = imageUploaded;
   
     let storageRef = firebase.storage().ref();
 ​
     const filename = Math.floor(Date.now() / 1000);
 ​
     const imageRef = storageRef.child(`${filename}.jpg`);
 
     const upload = imageRef.putString(imageUploaded, 'data_url');
     upload.on('state_changed', snapshot => {
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
     console.log(progress);

      if (progress == 100){
        console.log('uploaded');
        
      }
    }, err => {
      console.log('Upload erro');
      
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(downUrl => {
        this.profiles.image = downUrl;
      })
    })
   })
}

  retrieveData() {

    let users = this.db.collection('bookings');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    // ...query the profile that contains the uid of the currently logged in user...
  //   console.log('Profile User: ', this.infoProvider.returnUser());
  //   let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
  //   query.get().then(querySnapshot => {
  //     // ...log the results if the document exists...
  //     if (querySnapshot.empty !== true) {
  //       console.log('Got data', querySnapshot);
  //       querySnapshot.forEach(doc => {
  //         this.displayProfile = doc.data();

  //         console.log('Profile Document: ', this.displayProfile)
  //       })
  //     } else {
  //       console.log('No data');
  //     }
  //     // dismiss the loading
  //     load.dismiss();
  //   }).catch(err => {
  //     // catch any errors that occur with the query.
  //     console.log("Query Results: ", err);
  //     // dismiss the loading
  //     load.dismiss();
  //   })



  }

  gotolist() {
    this.navCtrl.push(ViewroomsPage);
  }

  gotoBookings() {
    this.navCtrl.push('ModalPage');
  }

  async deleteProfile() {
    this.db.collection("Bookings").doc(firebase.auth().currentUser.uid).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
   }

  updateProfile() {
    this.db.collection("User Profiles").doc(firebase.auth().currentUser.uid).delete().then(() => {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });

  }

  createUser(){
    // error statement if the fields are empty
    // if(!this.profiles.fullname || !this.profiles.email || !this.profiles.phone){
    //   this.toastCtrl.create({
    //     message: 'Not Yet! Do not leave any field empty.',
    //     duration: 3000
    //   }).present();
    // }else{
    //  if (!this.imageSelected){
    //   this.toastCtrl.create({
    //     message: 'Not Yet!. Profile Image is required',
    //     duration: 3000
    //   }).present();
    //  }else {
      //  if (this.profiles.phone.length < 10 || this.profiles.phone.length > 10) {
      //   this.toastCtrl.create({
      //     message: 'Not Yet!. Phone number must be 10 digits',
      //     duration: 3000
      //   }).present();
      //  } else {
         // load the profile creation process
         
         const load = this.loadingCtrl.create({
          content: 'Creating Profile..'
        });
        load.present();
        const user = this.db.collection('bookings').doc(firebase.auth().currentUser.uid).set(this.profiles);
        // upon success...
        user.then( () => {
          this.toastCtrl.create({
            message: 'User Profile added.',
            duration: 2000
          }).present();
          // ...get the profile that just got created...
          load.dismiss();
          //this.getProfile()
          // catch any errors.
        }).catch( err=> {
          this.toastCtrl.create({
            message: 'Error creating Profile.',
            duration: 2000
          }).present();
          this.isProfile = false;
          load.dismiss();
        })
       }

     
    
          // add a doc profile for the currently loggged in user
      // let load2 = this.loadingCtrl.create({
      //   content: 'Adding Profile'
      // })
      // load2.present();
      // set the doc's id to the user's uid
      // set the doc's fields

  

  logout(){
    firebase.auth().signOut().then(() => {
      console.log('User logged out');

    });
  }
    
  retrieveBooking() {

    let users = this.db.collection('bookings');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
  //   // ...query the Booking that contains the uid of the currently logged in user...
  //   console.log('User Bookings: ', this.infoProvider.returnUser());
  //   let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
  //   query.get().then(querySnapshot => {
  //     // ...log the results if the document exists...
  //     if (querySnapshot.empty !== true) {
  //       console.log('Got data', querySnapshot);
  //       querySnapshot.forEach(doc => {
  //         this.displayBooking.push(doc.data());
  //         console.log('Booking Document: ', this.displayBooking)
  //         // console.log('bookings', doc.data());
          
  //       });
        
  //     } else {
  //       this.showComp = true;
  //       console.log('No Booking data');
  //     }
  //     // dismiss the loading
  //     load.dismiss();
  //   }).catch(err => {
  //     // catch any errors that occur with the query.
  //     console.log("Query Results: ", err);
  //     // dismiss the loading
  //     load.dismiss();
  //   });
   }
  profilee(){
    this.navCtrl.push(EditPage);
  }
  getProfile() {
        
    this.db.collection('UserInfo').where('uid', '==', firebase.auth().currentUser.uid).get().then(res => {
      res.forEach(doc => {
        console.log(doc.data());
        this.profiles.image = doc.data().image
        this.profiles.phone = doc.data().phone
        this.profiles.fullname = doc.data().firstname 
        this.profiles.email = doc.data().email
       
      })
    
     
    }).catch(err => {
      console.log(err);
      
    })
  }
}

