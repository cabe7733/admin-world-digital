import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authservices:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  logOut(){
    this.authservices.logout();
    this.router.navigate(['/login'])
  }

}
