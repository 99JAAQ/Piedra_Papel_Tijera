import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class guardLogin implements CanActivate {    
    constructor(
      private _ruta: Router,
      private _cookie: CookieService) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): any {
      let isLoggedIn = this._cookie.check('token');
      if (isLoggedIn == true) {
        this._ruta.navigate(['/inicio']);
        return false;
      }
      return true;
    }
  }