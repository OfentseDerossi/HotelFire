
// import { Injectable } from '@angular/core';
// import * as firebase from 'firebase';

// @Injectable()
// export class InformationProvider{

//   db = firebase.firestore();

//   treatments;
//   reservation;
//   suites: any;
//    user ;
//    favourite;
//    uid: string;

//   constructor() {
//     console.log('Hello InformationProvider Provider');

//   }
//   getUser(val) {
//     this.user = val;
//     console.log('User data in provider: ', this.user);

//   }

//   loginUser(email: string,password: string): Promise<firebase.auth.UserCredential> {
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   }

//   signupUser(email: string, password: string): Promise<any> {
//     return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
//     this.uid = firebase.auth().currentUser.uid
//         firebase.firestore().doc(`/SalonOwnerProfile/${newUserCredential.user.uid}`).set({ email  });
//       })
//        .catch(error => {
//         console.error(error);
//         throw new Error(error);
//       });
//   }

//   returnUser() {
//     return this.user();
//   }


//   storeTreatment(val) {
//     this.treatments = val
//   }

//   storeReservation(val) {
//     this.reservation = val
//   }

//   storePrices(val) {
//     this.suites = val
//   }

//   getFavourite(val) {
//     this.favourite = val
//   }
//   updateBio(){
//     return this.user;
//   }
// }
