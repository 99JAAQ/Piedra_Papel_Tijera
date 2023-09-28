import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Alerts } from "../alertas/alerts";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _cookie: CookieService,
        private _ruta: Router,
        private helper: JwtHelperService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isLoggedIn = this._cookie.check('token');
        if (isLoggedIn == false) {
            if (request.url == `${environment.url}api/players/Authenticate`) return next.handle(request);
            if (request.url == `${environment.url}api/players/AddPlayer`) return next.handle(request);
            Swal.fire({
                title: 'Se venció la sesión',
                text: '',
                timer: 2000
            }).then(() => {
                this._cookie.delete("token", "login");                
            })
            return of();
        } else {
            if (this.helper.isTokenExpired(this._cookie.get('token'))) {
                this._cookie.delete("token");
                this._ruta.navigate(['login']);
                Alerts.Error("Error", "La sesión se venció", "ok");                
                return of();
            }
            var token = this._cookie.get("token");
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}