import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Item } from 'ionic-angular';
import * as firebase from 'firebase';
import {snapShots} from '../../app/Firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ViewroomsPage} from '../viewrooms/viewrooms';




/**
 * Generated class for the HotelmainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotelmain',
  templateUrl: 'hotelmain.html',
})
export class HotelmainPage {

  items = [];
  db = firebase.firestore();
  storage = firebase.storage().ref();
  
  hotel = {
    image: '',
    name: '',
    desc: '',
    price: 0,
    full_desc:'',
    bathroom:'',
    Amenities: [],
    parking:'',
    uid: firebase.auth().currentUser.uid
    
  }
//  users = { } ;
  image: string;
  

  storageRef = firebase.storage().ref();
  addRooms =  firebase.database().ref('items/');
  myphoto;
  // room = {} as addroom;
  userID: string;
  loadingCtrl: any;
  uid:any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public camera: Camera) {}

  addItem() {

    const user = firebase.auth().currentUser.uid;
  
  this.db.collection('hotels').add(this.hotel).then(res => {
    console.log('hotel added');
    
  }).catch(err => {
    console.log('An error happened', err);
    
  })
    
  }

  async delItem(key){
    firebase.database().ref('items/'+key).remove();
  }

  editItem(key){
    let alert = this.alertCtrl.create ({
      title : 'Edit item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        
        },
        {
          text:'Edit',
          handler: data => {
            if (data.name!==undefined && data.name.length > 0){
                firebase.database().ref('items/' +key).update({name:data.name});
            }
          }
        }
          
      ]
    });
    alert.present();
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
        this.hotel.image = downUrl;
      })
    })
   })
}

  ViewroomsPage(){
    this.navCtrl.push(ViewroomsPage);
  }
  upload() {
    

  }
}
