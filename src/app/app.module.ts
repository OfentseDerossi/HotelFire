import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Login1Page } from '../pages/login1/login1';
import {SignupPage} from '../pages/signup/signup';

import { HotelmainPage} from '../pages/hotelmain/hotelmain';
import { HttpModule} from "@angular/http";
import { Camera } from '@ionic-native/camera';
import { WelcomePage } from '../pages/welcome/welcome';
import {ViewroomsPage} from '../pages/viewrooms/viewrooms';
import {BookingPage} from '../pages/booking/booking';
import { HotelProvider } from '../providers/hotel/hotel';
import {PayPage} from '../pages/pay/pay';
import * as firebase from 'firebase';
import {Room1Page} from '../pages/room1/room1';

import { firebaseconfig } from './Firebase';
import {Profile1Page} from '../pages/profile1/profile1';
// import { InformationProvider } from '../providers/Information/information';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import {CreateprofilePage} from '../pages/createprofile/createprofile';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProfilePage } from '../pages/profile/profile';
import {EditPage} from '../pages/edit/edit';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyApp,

    Login1Page,
    SignupPage,
    HotelmainPage,
    WelcomePage,
    ViewroomsPage,
    BookingPage,
    PayPage,
    Room1Page,
    ProfilePage,
    CreateprofilePage,
    EditPage
    

    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule.enablePersistence(),
    ReactiveFormsModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    Login1Page,
    SignupPage,
    HotelmainPage,
    WelcomePage,
    ViewroomsPage,
    BookingPage,
    PayPage,
    Room1Page,
    ProfilePage,
    CreateprofilePage,
    EditPage
    
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HotelProvider,
    AuthProvider,
    ProfileProvider,
    // InformationProvider
   
    
  ]
})


export class AppModule { }




