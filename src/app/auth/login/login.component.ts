import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email(): AbstractControl {
    return this.validationForm.get('email');
  }

  get password(): AbstractControl {
    return this.validationForm.get('password');
  }

  login(form:FormGroup){
    console.log(form.value);
  }

}
