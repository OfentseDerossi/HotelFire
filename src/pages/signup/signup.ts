import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading  } from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import { users } from '../../app/users';
import * as firebase from 'firebase';
import { Login1Page } from '../../pages/login1/login1';
import { CreateprofilePage } from '../createprofile/createprofile';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { EmailValidator } from '../../Validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';



/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public loading: Loading; 
  public signupForm: FormGroup; 
  users : any = {};

  constructor(public navCtrl: NavController,private fireAuth: AngularFireAuth, formbuilder: FormBuilder, public authProvider: AuthProvider, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
    this.signupForm = formbuilder.group({ 
      email: [ "", 
      Validators.compose([Validators.required, EmailValidator.isValid])], 
      password: [ "", 
      Validators.compose([Validators.minLength(6), Validators.required])],
      
    });
    
  }
  



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createRegister(users) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000
    })

    loading.present();
    let alertSuccess = this.alertCtrl.create({
        title: 'Registration',
        subTitle: 'you have been Successfully Registered. you can Login.',
        buttons: ['Ok']
    })

    firebase.auth().createUserWithEmailAndPassword(users.email, users.password).then((result) => {
      alertSuccess.present();
      this.navCtrl.setRoot(CreateprofilePage, result.user.uid);
      // this.navCtrl.push(CreateprofilePage);
      // this.fireAuth.auth.createUserWithEmailAndPassword(this.signupForm.get('email').value, this.signupForm.get('password').value).then((result) => {
      //   this.navCtrl.setRoot(CreateprofilePage, result.user.uid);
      //   alertSuccess.present();
      
    }).catch(function(error) {
      
      // let errorCode = error.code;
      // let errorMessage = error.message;
      // // Handle Errors here.
      // let alert = this.alertCtrl.create({
      //   title: errorCode,
      //   subTitle: errorMessage,
      //   buttons: ['Try Again'],
    })
    
    // alert.present();
  
  }

  WelcomePage(){
    this.navCtrl.push(WelcomePage);
  }
  skipRegister(){
    this.navCtrl.push(CreateprofilePage);
  }


}
