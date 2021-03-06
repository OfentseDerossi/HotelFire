import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthProvider {
  getuser(): string {
    throw new Error("Method not implemented.");
  }

  db = firebase.firestore();
  user
  uid
  public userProfile: firebase.firestore.DocumentReference;
  constructor() {
  
  }
  
  loginUser(email: string,password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
        this.uid = firebase.auth().currentUser.uid
        firebase.firestore().doc(`/SalonOwnerProfile/${newUserCredential.user.uid}`).set({ email  });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
setUser(val){
  this.user = val;
    console.log('User form Provider', this.user);
}
getUser(){
  return this.user;
}

}