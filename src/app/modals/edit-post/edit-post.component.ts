import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  data;
  validationForm: FormGroup;
  category;
  idsc;
  namesc;
  constructor(private postservices:BlogService, public modalRef: MdbModalRef<EditPostComponent>) { }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      contentPost:new FormControl(this.data.contentPost, [Validators.required]),
      creatorPost:new FormControl(this.data.creatorPost, [Validators.required]),
      imgPost:new FormControl(this.data.imgPost, [Validators.required]),
      subcategory:new FormControl(this.data.idSubCategory, [Validators.required]),
      titlePost:new FormControl(this.data.titlePost, [Validators.required]),
    });
    this.idsc = this.data.idSubCategory;
    this.namesc = this.data.subCategory;
    this.subCategory();
  }

  get contentPost():AbstractControl{
    return this.validationForm.get('contentPost');
  }
  get creatorPost():AbstractControl{
    return this.validationForm.get('creatorPost');
  }
  get imgPost():AbstractControl{
    return this.validationForm.get('imgPost');
  }
  get subcategory():AbstractControl{
    return this.validationForm.get('subcategory');
  }
  get titlePost():AbstractControl{
    return this.validationForm.get('titlePost');
  }

  onSubmit(form:FormGroup){
    this.postservices.editPost(this.data.id,form.value).then(result=>{
    })
    form.reset();
  }

  subCategory(){
    this.postservices.getSubCategory().then(result=>{
     this.category=result
    })
  }

}

/* categoryPost
id
idCategoryPost
idSubCategory */



