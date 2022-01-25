import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  validationForm: FormGroup;
  category;

  constructor(private postservices:BlogService,public modalRef: MdbModalRef<CreatePostComponent>) { }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      contentPost:new FormControl(null, [Validators.required]),
      creatorPost:new FormControl(null, [Validators.required]),
      imgPost:new FormControl(null, [Validators.required]),
      subcategory:new FormControl(null, [Validators.required]),
      titlePost:new FormControl(null, [Validators.required]),
    });
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
    this.postservices.addPost(form.value).then(result=>{
    })
    form.reset();
  }

  subCategory(){
    this.postservices.getSubCategory().then(result=>{
     this.category=result
    })
  }

}
