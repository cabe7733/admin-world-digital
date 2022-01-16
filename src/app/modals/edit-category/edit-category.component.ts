import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  title:string;
  name:string;
  desc:string;
  img:string;

  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<EditCategoryComponent>, private categoryServices:CategoryService) { }

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.validationForm = new FormGroup({
      nameCategory: new FormControl(this.name, [Validators.required, Validators.minLength(4)]),
      imgCategory: new FormControl(this.img, [Validators.required, Validators.pattern(reg)]),
      descCategory: new FormControl(this.desc, [Validators.required, Validators.minLength(14)]),
    });
  }

  get nameCategory(): AbstractControl {
    return this.validationForm.get('nameCategory');
  }

  get imgCategory(): AbstractControl {
    return this.validationForm.get('imgCategory');
  }

  get descCategory(): AbstractControl {
    return this.validationForm.get('descCategory');
  }

  editCategory(value:FormGroup){
    this.categoryServices.editCategory(this.title,value.value)
  }
}
