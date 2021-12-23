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
          console.log(userCredential);
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
      if (user) {
        const uid = user.uid;
        dataUser = user;
      } else {
        dataUser = undefined;
      }
    });
    return dataUser;
  }

  async logged():Promise<boolean> {
    let login;
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        login = true;
      } else {
        login = false;
      }

    });
    return login;
  }

  logout(){
     signOut(auth).then((data) => {
        console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

}
