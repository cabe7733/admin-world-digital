import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  validationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      dataText: new FormControl(null, Validators.required)
    });
  }

  get firstName(): AbstractControl {
    return this.validationForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.validationForm.get('lastName');
  }

  onSubmit(form:FormGroup){
    console.log(form.value);
  }

}
