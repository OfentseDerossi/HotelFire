import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Profile } from '../../app/Models/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import {InformationProvider} from '../../providers/Information/information';
import {ViewroomsPage} from '../viewrooms/viewrooms';
import {SignupPage} from '../signup/signup';
import {users} from '../../app/users'
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the CreateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createprofile',
  templateUrl: 'createprofile.html',
})
export class CreateprofilePage {

  items = [];
  db = firebase.firestore();
  storage = firebase.storage().ref();
  // profile = {} as Profile;


  UserInfo = {
    image:'',
    fullname:'',
    email:'',
    phone:'',
    Bio:'',
    uid: firebase.auth().currentUser.uid

  }

  // data = [];
  image:string;

  storageRef = firebase.storage().ref();
  addUserInfo = firebase.database().ref('items/');
  
  showComp = true;
  profileImage: string;
  users;

 
  uid: any;
  alertCtrl: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     
    public camera: Camera,
    public loadingCtrl : LoadingController) {
      // this.uid = this.navParams.data;
      // console.log(this.uid);
      
  }

  addItem() {
  console.log('Clicked');
  
   
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
        this.UserInfo.image = downUrl;
      })
    })
   })
}
  
    // firebase.auth().onAuthStateChanged(res => {
    //   this.uid = res.uid;
    //   this.users = this.infoProvider.user.uid;
    //   this.UserInfo = this.infoProvider.user.uid;
    //   console.log('profile popover2',  this.infoProvider.user)
    //   })
    //   return

  createProfile() {
    let users = this.db.collection('UserInfo');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
     this.db.collection('UserInfo').add(this.UserInfo).then(res => {
      console.log('UserInfo added');
      
    }).catch(err => {
      console.log('An error happened', err);
      
    })
  //   load.present();
  //   const images = this.storage.child(this.UserInfo.Bio + '.jpg')
  //   let upload = images.putString(this.profileImage, 'data_url');

  //   upload.on('state_changed', snapshot => {
  //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('create profile',progress);

  //   }, err => {

  //   }, () => {
  //     upload.snapshot.ref.getDownloadURL().then(downURL => {
  //       console.log('File available at: ', downURL);
  //       this.UserInfo.image = downURL

  //       users.doc(this.users).set(this.UserInfo).then(() => {
  //         load.dismiss();
         
  //       });
        this.navCtrl.push(WelcomePage);
  //     })
  //   })
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
    
  viewProfile() {
    this.navCtrl.push('ProfilePage');
  }

  showProfile() {
    this.showComp = !this.showComp;
  }


}
