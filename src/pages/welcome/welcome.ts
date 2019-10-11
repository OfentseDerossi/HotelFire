import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HotelmainPage} from '../../pages/hotelmain/hotelmain';
import {ViewroomsPage} from '../../pages/viewrooms/viewrooms';
import {ProfilePage} from '../../pages/profile/profile';
import { Login1Page } from '../login1/login1';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  HotelmainPage(){
    this.navCtrl.push(HotelmainPage);
  }

  ViewroomsPage(){
    this.navCtrl.push(ViewroomsPage);
  }
  GoToProfile(){
    this.navCtrl.push(ProfilePage)
  }
  logout(){
    this.navCtrl.push(Login1Page)
  }

}
