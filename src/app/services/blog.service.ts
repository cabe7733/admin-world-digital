import { Injectable } from '@angular/core';
import { db } from "../app.module";
import { doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, Timestamp, query, where, onSnapshot, getDoc, getDocs, deleteDoc, orderBy } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  async addPost(data){
    let nameCat= await this.getDataCategory(data.subcategory).then(result=>{
      return result;
    });
    let message;
    const docData = {
      categoryPost:nameCat.nameCategorySubCategory,
      idCategoryPost:nameCat.idCategorySubCategory,
      contentPost:data.contentPost,
      creatorPost:data.creatorPost,
      dateEditPost:serverTimestamp(),
      datePost:serverTimestamp(),
      idSubCategory:data.subcategory,
      imgPost:data.imgPost,
      subCategory:nameCat.nameSubCategory,
      titlePost:data.titlePost,
    };

    try {
       const docRef = await addDoc(collection(db, "blog"),docData);
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
    let data=[];
    let id;
    let subcategory;
    const citiesRef = collection(db, "subCategoryPost");
    const q = query(citiesRef, orderBy("nameSubCategory","desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id
      subcategory = doc.data().nameSubCategory
      data.push({id,subcategory});
    });
    return data;
  }

  async getPost(){
    let id;
    let data=[];
    const q = query(collection(db, "blog"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id
      data.push({id,...doc.data()});
    });
    console.log(data);

    return data;
  }

  /* async getCategoryId(id){
    const docRef = doc(db, "categoryPost", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().nameCategory);
      return docSnap.data().nameCategory;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } */

  async getDataCategory(id){
    const docRef = doc(db, "subCategoryPost", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async deletePost(id){
    await deleteDoc(doc(db, "blog", id));
  }

  async editPost(id,data){
    let nameCat= await this.getDataCategory(data.categorySubcategory).then(result=>{
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
    const categoryPostRef = doc(db, "blog", id);
    await updateDoc(categoryPostRef, docData);
  }
}
