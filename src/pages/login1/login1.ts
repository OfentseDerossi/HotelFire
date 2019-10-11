import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController,LoadingController, AlertController, Alert } from 'ionic-angular';

import {SignupPage} from '../signup/signup';
import { WelcomePage } from '../welcome/welcome';
import { users } from '../../app/users';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../Validators/email';

/**
 * Generated class for the Login1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page {

   users: any = {};
   public loginForm: FormGroup;
   db = firebase.firestore(); 
  fireAuth: any;
  loading: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private toast: ToastController,public authProvider: AuthProvider, formBuilder: FormBuilder, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({ 
      email: [ '', Validators.compose([Validators.required, EmailValidator.isValid]) ], 
      password: [ '', Validators.compose([Validators.required, Validators.minLength(6)]) 
  ] 
}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login1Page');
  }

  SignupPage() {
    this.navCtrl.push(SignupPage);
  }

  WelcomePage() {
    this.navCtrl.push(WelcomePage);
  }


  login(users) {

    if (!this.users.email || !this.users.password) {
      
    } else {
       this.fireAuth.auth.signInWithEmailAndPassword(this.users.email, this.users.password).then(res => {
     if (res) {
      //  console.log('Response from pop3: ', res);
      //  this.infoProv.getUser(res);
      //  this.viewCtrl.dismiss();
      // this.navCtrl.push('ListPage');
      
   }
   }).catch( err => {
     this.toast.create({
     message: "Invalid Email or Password",
     duration: 3000,
     cssClass: "error"
   }).present();
   })
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000
    })
    loading.present();

    let alertSuccess = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'You have Successfully LoggedIn',
      buttons: ['Ok']
      })

      firebase.auth().signInWithEmailAndPassword(users.email, users.password).then((result) => {
        alertSuccess.present();
        if(result.user.uid>"")
        {
        
        };
    }).catch((error) => {
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
   
    //   this.alertCtrl.create({
    //     title: errorCode,
    //     subTitle: errorMessage,
    //     buttons: ['Ok']
    //   }).present();
    })

  this.navCtrl.setRoot(WelcomePage)
  }
  gotoRegister() {
    this.navCtrl.push(SignupPage);
   }

   loginUser(): void { 
    if (!this.loginForm.valid) { 
      console.log( `Form is not valid yet, current value: ${this.loginForm.value}` 
      ); 
    } else { 
      const email = this.loginForm.value.email; 
      const password = this.loginForm.value.password; 
      this.authProvider.loginUser(email, password).then( authData => { 
        this.loading.dismiss().then(() => {
           this.navCtrl.setRoot(WelcomePage); 
          }); 
        }, error => { 
          this.loading.dismiss().then(() => {
             const alert: Alert = this.alertCtrl.create({ 
               message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }] 
              }); 
              alert.present(); 
            }); 
          } 
          ); 
          this.loading = this.loadingCtrl.create(); 
          this.loading.present(); 
        } 
        
      }

   loginWithGoogle(){
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/firebase')).then((result) => {
      var token = result.credential.providerId;
      console.log('logged in with google---');
      this.loads();
      if(result.user.uid)
      {
      //this.navCtrl.setRoot(WelcomePage);
      }
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
   }
    loads() {
      throw new Error("Method not implemented.");
    }
   

}
