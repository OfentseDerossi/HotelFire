import { Component } from '@angular/core';
import { ProfileProvider } from './../../providers/profile/profile';
import { Alert, AlertController, IonicPage, NavController, NavParams,  ToastController, LoadingController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import * as firebase from 'firebase';
import { Profile } from '../../app/Models/profile';
//import { InformationProvider } from '../../providers/information/information';
 import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public birthDate: string;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profile = {} as Profile;
  data = [];
  uid;
  showComp = true;
  profileImage: string;
  firstName?: string;

  bookings = {};
  // infoProv: any;
  // viewCtrl: any;
  image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

    
    
  ) {
  }

  ionViewDidLoad() {
    this.db.collection('bookings').where('uid', '==',firebase.auth().currentUser.uid)
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        this.bookings = doc.data();
      })
      console.log(this.bookings);
    })
  }

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
      // this.db.collection('UserInfo').doc('33xcmU9K890VZeSIRPAI').set({image: 'imageUploaded'}, {merge: true});
      console.log(imageUploaded);
      
      this.image = imageUploaded;
   
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
      console.log('Upload error');
      
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(downUrl => {
        this.image = downUrl;
      })
    })
   })
}

//   takePhoto(sourcetype: number) {
//     const options: CameraOptions = {
//       quality: 50,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       sourceType: sourcetype,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true
//     }
    
//     this.camera.getPicture(options).then((captureDataUrl) => {
//       // imageData is either a base64 encoded string or a file URI
//       // If it's base64 (DATA_URL):
//       let imageUploaded = 'data:image/jpeg;base64,' + captureDataUrl;
//       console.log(imageUploaded);
      
//       this.image = imageUploaded;
   
//      let storageRef = firebase.storage().ref();
//  ​
//      const filename = Math.floor(Date.now() / 1000);
//  ​
//      const imageRef = storageRef.child(`${filename}.jpg`);
 
//      const upload = imageRef.putString(imageUploaded, 'data_url');
//      upload.on('state_changed', snapshot => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       console.log(progress);

//       if (progress == 100){
//         console.log('uploaded');
        
//       }
//     }, err => {
//       console.log('Upload error');
      
//     }, () => {
//       upload.snapshot.ref.getDownloadURL().then(downUrl => {
//         this.UserInfo.image = downUrl;
//       })
//     })
//    })
// }

  UpdatePro(bookings) {
  //   let users = this.db.collection('UserInfo');

  //   let load = this.loadingCtrl.create({
  //     content: 'Loading'
  //   });

  //   load.present();
  //   const images = this.storage.child(this.profile.bio + '.jpg')
  //   let upload = images.putString(this.profileImage, 'data_url');

  //   upload.on('state_changed', snapshot => {
  //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('popover2 Picture', progress);

  //   }, err => {

  //   }, () => {
  //     upload.snapshot.ref.getDownloadURL().then(downURL => {
  //       console.log('File available at: ', downURL);
  //       this.profile.image = downURL

  //       console.log(this.bookings);
  //       this.db.collection("UserInfo").doc(this.authProvider.getuser()).set(this.bookings).then((ref) => {
  //         load.dismiss();
  //         console.log("This is the ref =", ref)
         
    this.navCtrl.push(ProfilePage)
 
  //       });
  //       // this.navCtrl.push(ProfilePage)
        
  //     })

  //   })
    }

  cancel() {
    this.navCtrl.push(ProfilePage);
  }

}