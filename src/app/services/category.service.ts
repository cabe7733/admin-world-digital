import { Injectable } from '@angular/core';
import { db } from "../app.module";
import { doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, Timestamp, query, where, onSnapshot, getDoc, getDocs, deleteDoc } from "firebase/firestore";

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
      descCategory: data.descCategory,
      dateCategory:serverTimestamp(),
      dateCategoryEdit:serverTimestamp()
    };
    try {
      const docRef = await addDoc(collection(db, "categoryPost"),docData);
      message =docRef.id;
    } catch (e) {
      message =e;
    }
    return message;
  }

/*   async getCategoryTR(){
    let data=[];
    onSnapshot(collection(db, "categoryPost"),(snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let dataCat = change.doc.data();
          let id= change.doc.id;
          data.push({id,...dataCat})
          console.log(data);
          return data;
        });
    },(error) => {
      console.log(error);
      return error;
    });
    return data;
  } */

  async getCategory(){
    let id;
    let data=[];
    const q = query(collection(db, "categoryPost"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id
      data.push({id,...doc.data()});
    });
    return data;
  }

  async deleteCategory(id){
    await deleteDoc(doc(db, "categoryPost", id));
  }

  async editCategory(id,data){
    const docData = {
      nameCategory: data.nameCategory,
      imgCategory: data.imgCategory,
      descCategory: data.descCategory,
      dateCategoryEdit:serverTimestamp()
    };
    const categoryPostRef = doc(db, "categoryPost", id);
    await updateDoc(categoryPostRef, docData);
  }
}
