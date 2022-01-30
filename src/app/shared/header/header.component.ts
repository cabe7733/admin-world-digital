import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dataUser:any;

  constructor(private authservices:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.dataUser={
      displayName:sessionStorage.getItem('displayName'),
      email:sessionStorage.getItem('email'),
      photoURL:sessionStorage.getItem('photoURL'),
      emailVerified:sessionStorage.getItem('emailVerified'),
      uid:sessionStorage.getItem('uid'),
    };
  }

  myPerfil(){
    this.router.navigate(['/component/perfil'])
  }

  logOut(){
    this.authservices.logout();
    this.router.navigate(['/login'])
  }

}
