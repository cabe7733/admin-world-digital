import { Injectable } from '@angular/core';
import { auth } from "../app.module";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification, updatePassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(email,password){

      let datalogin;

      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          datalogin = true;
      }).catch((error) => {
          const errorCode = error.code;
          let notlogin = false;
          datalogin = { errorCode, notlogin };
      });
      return datalogin;
  }

  async getUsusario(){
    let dataUser;
    await onAuthStateChanged(auth, (user) => {
      dataUser = user;
    });
    return dataUser;
  }

  logout(){
     signOut(auth).then((data) => {
        //
    }).catch((error) => {
      console.log(error);
    });
  }


  editDataUser(data){
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      console.log(error);
    });
  }

  editEmailUser(data){
    updateEmail(auth.currentUser, data.email).then(result => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  verifyUser(){
    sendEmailVerification(auth.currentUser).then(() => {
    });
  }

  editPassword(data){
    const user = auth.currentUser;
    const newPassword =data.password;

    updatePassword(user, newPassword).then(result => {
      console.log(result);

    }).catch((error) => {
      console.log(error);
    });
  }

}
