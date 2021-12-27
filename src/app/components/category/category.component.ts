import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  validationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });
  }

  get firstName(): AbstractControl {
    return this.validationForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.validationForm.get('lastName');
  }

}
