import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../app.module";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor() { }

  async addSubCategory(data){
    let nameCat= await this.getCategoryId(data.categorySubcategory).then(result=>{
      return result;
    });

    let message;
    const docData = {
      nameSubCategory:data.Name,
      idCategorySubCategory: data.categorySubcategory,
      nameCategorySubCategory:nameCat,
      imgSubCategory: data.imgSubcategory,
      descSubCategory: data.descSubcategory,
      dateSubCategory:serverTimestamp(),
      dateSubCategoryEdit:serverTimestamp()
    };
    try {
      const docRef = await addDoc(collection(db, "subCategoryPost"),docData);
      message =docRef.id;
    } catch (e) {
      message =e;
    }
    return message;
  }

  async getCategory(){
    let data=[];
    let id;
    let category;
    const citiesRef = collection(db, "categoryPost");
    const q = query(citiesRef, orderBy("nameCategory","desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id
      category = doc.data().nameCategory
      data.push({id,category});
    });
    return data;
  }

  async getSubCategory(){
    let id;
    let data=[];
    const q = query(collection(db, "subCategoryPost"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id
      data.push({id,...doc.data()});
    });
    return data;
  }

  async getCategoryId(id){
    const docRef = doc(db, "categoryPost", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().nameCategory;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async deleteSubCategory(id){
    await deleteDoc(doc(db, "subCategoryPost", id));
  }

  async editSubCategory(id,data){
    let nameCat= await this.getCategoryId(data.categorySubcategory).then(result=>{
      return result;
    });
    const docData = {
      nameSubCategory:data.Name,
      idCategorySubCategory: data.categorySubcategory,
      nameCategorySubCategory:nameCat,
      imgSubCategory: data.imgSubcategory,
      descSubCategory: data.descSubcategory,
      dateSubCategoryEdit:serverTimestamp()
    };
    const categoryPostRef = doc(db, "subCategoryPost", id);
    await updateDoc(categoryPostRef, docData);
  }
}
