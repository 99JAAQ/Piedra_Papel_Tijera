import { Component, OnInit } from "@angular/core";
import { FormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { servicesLogin } from "src/modules/shared/services/services.login";
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public _formulario = new FormGroup({
        txtUsuario: new UntypedFormControl(null, Validators.required),
        txtPassword: new UntypedFormControl(null, Validators.required),
    })
    conversionEncryptOutput: string | undefined;
    conversionDecryptOutput: string | undefined;
    plainText: string | any;
    encryptText: string | undefined;
    encPassword: string | any;
    decPassword: string | undefined;
    constructor(private services: servicesLogin,
        private ruta: Router,
        private spinner: NgxSpinnerService,
        private cookieServices: CookieService) { }
    ngOnInit(): void {
        this.spinner.show();
        this.spinner.hide();
    }
    async ingresar() {
        try {
            this.spinner.show();
            var txtUsuario = this._formulario.value.txtUsuario;
            var txtPassword = this._formulario.value.txtPassword;
            
            if (txtUsuario == null || txtUsuario.trim() == "") throw "Es obligatorio el usuario";
            if (txtPassword == null || txtPassword.trim() == "") throw "Es obligatorio la contraseña";
            var passhash = await this.services.hashPassword(txtPassword).then((data: string) => { return data; }).catch((err) => { throw err; });

            var json = {
                "userName": txtUsuario,
                "password": passhash
            }
            var result = await this.services.iniciarSesion(json).then(data => { return data; }).catch((err) => { throw err; });

            this.cookieServices.set('token', result, 1, "/");

            this.spinner.hide();
            this.ruta.navigate(['/inicio/home']);
        } catch (error: any) {
            this.spinner.hide();
            Swal.fire('Error', error.toString(), 'error');
        }
    }
}