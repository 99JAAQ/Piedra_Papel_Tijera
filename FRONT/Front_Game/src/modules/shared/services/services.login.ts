import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';
import { LoginModelDTO } from '../models/tblSistema/LoginModelDTO';
import { Errores } from './errores.services';


@Injectable({
    providedIn: 'root'
})
export class servicesLogin {
    url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }
    crearUsuario(objetoUsuario: any) {
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(`${environment.url}api/players/AddPlayer`, objetoUsuario).subscribe(
                (data: any) => {
                    resolve(data);
                }, (error: any) => {
                    var result = Errores.obtenerErrores(error);
                    reject(result);
                }
            );
        });
    }
    
    iniciarSesion(objetoUsuario: LoginModelDTO) {
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(`${environment.url}api/players/Authenticate`, objetoUsuario).subscribe(
                (data: any) => {
                    resolve(data.data);
                }, (error: any) => {
                    var result = Errores.obtenerErrores(error);
                    
                    reject(result);
                }
            );
        });
    }
    hashPassword(password: string) {        
        return new Promise<string>((resolve, reject) => {
            var passwordHas = Md5.hashStr(password!.trim());
            resolve(passwordHas);
        });
    }

}


