import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  infoUser: FormGroup;
  emailUser: FormGroup;
  passwordUser:FormGroup;
  dataUser:any;
  loadpage = true;

  constructor(private authservices:AuthService) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.dataInfoUser()
    }, 1000);

    setTimeout(()=>{
      const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      this.infoUser = new FormGroup({
        displayName: new FormControl(this.dataUser.displayName, [Validators.required, Validators.minLength(5)]),
        photoURL: new FormControl(this.dataUser.photoURL, [Validators.required, Validators.pattern(reg)]),
      });

      this.passwordUser= new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(40)])
      });

      this.emailUser = new FormGroup({
        email: new FormControl(this.dataUser.email, [Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
      });
    }, 1100);

  }

  get displayName(): AbstractControl {
    return this.infoUser.get('displayName')!;
  }

  get photoURL(): AbstractControl {
    return this.infoUser.get('photoURL')!;
  }

  get email(): AbstractControl {
    return this.emailUser.get('email')!;
  }

  get password(): AbstractControl {
    return this.passwordUser.get('password')!;
  }

  editInfoUser(form:FormGroup){
    this.authservices.editDataUser(form.value);
    setTimeout(()=>{
      this.dataInfoUser()
    }, 1000);
  }

  editEmailUser(form:FormGroup){
    this.authservices.editEmailUser(form.value)
    setTimeout(()=>{
      this.dataInfoUser()
    }, 1000);
  }

  editPass(form:FormGroup){
    console.log(form.value);
  }

  dataInfoUser(){
    this.authservices.getUsusario().then(result=>{
      this.loadpage =false;
      this.dataUser=result;
    })
  }

}//dataUser.emailVerified;
