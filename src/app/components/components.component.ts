import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  constructor(private services:AuthService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.infoUser();
    }, 1000);

    setTimeout(()=>{
      this.services.logout();
    }, 30000);
  }

  infoUser(){
    this.services.getUsusario().then(user=>{
      console.log(user);
    })
  }

}
