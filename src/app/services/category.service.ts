import { Injectable } from '@angular/core';
import { db } from "../app.module";
import { doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, Timestamp, query, where, onSnapshot, getDoc, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }


  async addCategory(data){

    let message;
    const docData = {
      nameCategory: data.nameCategory,
      imgCategory: data.imgCategory,
      descCategoty: data.descCategory,
      dateCategory:serverTimestamp()
    };
    try {
      const docRef = await addDoc(collection(db, "categoryPost"),docData);
      console.log("Document written with ID: ", docRef.id);
      message =docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      message =e;
    }

    return message;
  }

  async getCategory(){
    let data=[];
    let Error;
    onSnapshot(collection(db, "categoryPost"),(snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let dataCat = change.doc.data();
          data.push(dataCat)
          console.log(data);
          return data;
        });
    },
    (error) => {
      console.log(error);
      return Error = error;
    });

    return data;
  }

  async dastaCategory(){
    let id;
    let data=[];
    const q = query(collection(db, "categoryPost"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id =doc.id
      data.push({id,...doc.data()});
    });

    return data;
  }
}
