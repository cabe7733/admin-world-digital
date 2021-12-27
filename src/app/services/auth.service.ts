import { Injectable } from '@angular/core';
import { auth } from "../app.module";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

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
      console.log(datalogin);

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

}
