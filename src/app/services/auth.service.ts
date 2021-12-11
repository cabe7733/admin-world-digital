import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email,password){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}
