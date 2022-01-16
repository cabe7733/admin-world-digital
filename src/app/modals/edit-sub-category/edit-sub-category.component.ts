import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {

  validationForm: FormGroup;
  category;

  title;
  desc;
  img;
  namecat;
  namesubcat;
  idnamecat;

  constructor(private subCategoryService:SubCategoryService,  public modalRef: MdbModalRef<EditSubCategoryComponent>) { }

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.validationForm = new FormGroup({
      Name: new FormControl(this.namesubcat, [Validators.required, Validators.minLength(4)]),
      descSubcategory: new FormControl(this.desc, [Validators.required, Validators.minLength(44)]),
      imgSubcategory: new FormControl(this.img, [Validators.required, Validators.pattern(reg)]),
      categorySubcategory: new FormControl(this.idnamecat, [Validators.required]),
    });
    this.getcategory();
  }

  get Name(): AbstractControl {
    return this.validationForm.get('Name');
  }

  get descSubcategory(): AbstractControl {
    return this.validationForm.get('descSubcategory');
  }

  get imgSubcategory(): AbstractControl {
    return this.validationForm.get('imgSubcategory');
  }

  get categorySubcategory(): AbstractControl {
    return this.validationForm.get('categorySubcategory');
  }

  editCategory(value:FormGroup){
    this.subCategoryService.editSubCategory(this.title,value.value);
  }

  getcategory(){
    this.subCategoryService.getCategory().then(result=>{
      this.category = result;
    });
  }
}
