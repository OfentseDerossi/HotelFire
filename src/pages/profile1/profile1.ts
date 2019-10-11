import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { Profile } from '../../app/Models/profile';
import { auth } from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database'

/**
 * Generated class for the Profile1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile1',
  templateUrl: 'profile1.html',
})
export class Profile1Page {

  profile = {} as Profile

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private afAuth: AngularFireAuth,
  private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile1Page');
  }

  createprofile(){
    this.afAuth.authState.take(1).subscribe( auth => {
      this.afDatabase.object('userprofile/${auth.uid}').set(this.profile)
      .then (() => this.navCtrl.setRoot('WelcomePage'))
      
    })
  }

}
