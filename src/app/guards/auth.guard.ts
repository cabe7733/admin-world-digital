import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservices:AuthService, private router:Router){}

  canActivate() {
      if (!this.authservices.logged()) {
        console.log(this.authservices.logged());
        this.router.navigate(['/login'])
        return false;
      }
      return true;
  }

}
