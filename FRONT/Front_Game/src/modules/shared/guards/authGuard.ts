import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {    
    constructor(
        private _ruta: Router,
        private _cookie: CookieService
    ) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any {
        let isLoggedIn = this._cookie.check('token');
        if (isLoggedIn == true) {
            return true;
        } else {
            this._ruta.navigate(['/login']);
            return false;
        }
    }
    checkLogin() {
    }
}
