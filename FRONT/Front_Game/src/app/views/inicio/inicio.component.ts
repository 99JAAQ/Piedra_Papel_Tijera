import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import jsonMenu from '../menu.json';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'inicio-component',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    public lista: any[] = [];
    constructor(
        private ruta: Router,
        private _cookie: CookieService,
        private cookieServices: CookieService,
        ) {
        this.lista = jsonMenu;
    }
    public tokenObject: any;
    
    async ngOnInit() {
        this.tokenObject = jwt_decode(this._cookie.get('token'));        
    }

    logout() {
        this.cookieServices.delete("token", "login");
        this.ruta.navigate(["/login"])
    }
    async navegar(url: string) {
        this.ruta.navigate([url])
    }
}