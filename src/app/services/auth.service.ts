import { Injectable } from '@angular/core';
import { auth } from "../app.module";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification, updatePassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(email,password){

      let datalogin:any;

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
    let dataUser:any;
    await onAuthStateChanged(auth, (user) => {
      dataUser = user;
    });
    return dataUser;
  }

  userInfo(){
    const user = auth.currentUser;
    if (user !== null) {
      if (user.emailVerified) {
        sessionStorage.setItem('emailVerified','true')
      }else{
        sessionStorage.setItem('emailVerified','false')
      }
      sessionStorage.setItem('displayName',user.displayName)
      sessionStorage.setItem('email',user.email)
      sessionStorage.setItem('photoURL',user.photoURL)
      sessionStorage.setItem('uid',user.uid)
    }
    return user;
  }

  logout(){
     signOut(auth).then((data) => {
        //
    }).catch((error) => {
      console.log(error);
    });
    sessionStorage.clear();
  }


  editDataUser(data){
    let result;
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    }).then(result=> {
      result=result;
    }).catch((error) => {
      result=error
    });
    return result;
  }

  editEmailUser(data){
    let result;
    updateEmail(auth.currentUser, data.email).then(result => {
      result= result;
    }).catch((error) => {
      result=error;
    });
    return result;
  }

  verifyUser(){
    sendEmailVerification(auth.currentUser).then(() => {
    });
  }

  editPassword(data){
    const user = auth.currentUser;
    const newPassword =data.password;

    updatePassword(user, newPassword).then(result => {
    }).catch((error) => {
      console.log(error);
    });
  }

}
