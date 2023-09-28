import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { clsUsuarioSistemaDTO } from 'src/modules/shared/models/tblUsuarios/clsUsuarioSistemaDTO';
import { servicesLogin } from 'src/modules/shared/services/services.login';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-cmp-crear-usuario',
    templateUrl: './crearUsuario.component.html',
    styleUrls: ['./crearUsuario.component.css']
})

export class CmpCrearUsuario implements OnInit {
    public _formulario = new FormGroup({
        fullName: new UntypedFormControl(null, Validators.required),
        password: new UntypedFormControl(null, Validators.required),
        userName: new UntypedFormControl(null, Validators.required),
    })

    constructor(
        private services: servicesLogin,
        private ruta: Router,
        private servicesUsuario: servicesLogin,
        private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
    }
    async crearUsuario() {
        try {
            this.spinner.show();
            var passhash = await this.servicesUsuario.hashPassword(this._formulario.value.password.trim()).then((data: string) => { return data; }).catch((err) => { throw err; });
            var usuario = new clsUsuarioSistemaDTO();
            
            usuario.userName = this._formulario.value.userName.trim();
            usuario.password = passhash;
            usuario.fullName = this._formulario.value.fullName.trim();    

            await this.services.crearUsuario(usuario).then(data => { return data; }).catch((err) => { throw err; });
            
            this.spinner.hide();
            Swal.fire('Registrado', "", 'success');
            this.ruta.navigate(['/login']);
            
        } catch (error: any) {
            this.spinner.hide();
            Swal.fire('Error', error.toString(), 'error');
        } 
    }
}