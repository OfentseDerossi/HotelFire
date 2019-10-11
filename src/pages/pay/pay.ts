import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { ViewroomsPage } from '../viewrooms/viewrooms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, Validator } from '@angular/forms';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  db = firebase.firestore();
  public credentialsForm: FormGroup; 
  public loading: Loading
  
  payments = {
    cardholder:"",
    cardno: "",
    expirydate: "",
    cvc: "",

  }
  


  constructor(public navCtrl: NavController,     public loadingCtrl: LoadingController, private FormsModule: FormsModule, public navParams: NavParams,formBuilder: FormBuilder,public alertCtrl: AlertController) {
  
    this.credentialsForm = formBuilder.group({ 
      cardno: [ '', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)]) ], 
      cvc: [ '', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])], 
      cardholder: [ '', Validators.compose([Validators.required])],
      expirydate: [ '', Validators.compose([Validators.required]) 
    ]
});  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
pay(){
  if (this.payments.cardholder === undefined && this.payments.cardno === undefined && this.payments.expirydate && this.payments.cvc)
  {
    let alertSuccess = this.alertCtrl.create({
      title:'',
      subTitle: 'card holder, card number, card expiring date and cvc cannot be empty',
      buttons:['ok']
    });
    this.navCtrl.setRoot(ViewroomsPage)
  }else {

  }
  
  let alertSuccess = this.alertCtrl.create({
    title:'Confirmation Message',
    subTitle: 'You have successfully made a payment',
    buttons:['Ok']
  });
  alertSuccess.present();
  this.navCtrl.setRoot(ProfilePage)
  }
}
