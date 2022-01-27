import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationForm: FormGroup;

  constructor(private services:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.services.getUsusario().then(user=>{
      if (!user) {
        this.services.logout();
      }
    })

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
    const { email ,password } = form.value;
    this.services.login(email ,password).then(result=>{
      if (result ==true) {
        this.router.navigate(['/component/home'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

}
