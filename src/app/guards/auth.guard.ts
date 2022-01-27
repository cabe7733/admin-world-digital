import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, NavigationStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservices:AuthService, private router:Router){}

  canActivate(): Observable<boolean> | Promise<boolean>  {
      return this.authservices.getUsusario().then(user=>{
        if (!user) {
          this.router.navigate(['/login'])
          return false;
        }
         return true;
      })

  }
}

