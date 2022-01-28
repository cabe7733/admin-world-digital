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
    setTimeout(()=>{
      this.dataInfoUser()
    }, 1000);
  }

  myPerfil(){
    this.router.navigate(['/component/perfil'])
  }

  logOut(){
    this.authservices.logout();
    this.router.navigate(['/login'])
  }

  dataInfoUser(){
    this.authservices.getUsusario().then(result=>{
      this.dataUser=result;
    })
  }

}
