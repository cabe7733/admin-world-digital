import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, NavigationStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservices:AuthService, private router:Router){}

  canActivate():boolean{
      if (!this.authservices.logged()) {
          this.router.navigate(['/login']);
          this.authservices.logout();
          return false;
      }
      return true;
  }

}
