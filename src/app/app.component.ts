import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Login1Page } from '../pages/login1/login1';
import {firebaseconfig} from '../app/Firebase';
import * as firebase from 'firebase';
import { CreateprofilePage } from '../pages/createprofile/createprofile';
import { ViewroomsPage } from '../pages/viewrooms/viewrooms';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any 
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    firebase.initializeApp(firebaseconfig);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = Login1Page;
        unsubscribe();
      } else {
        this.rootPage = WelcomePage;
        unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      

    });

    
  }
}

