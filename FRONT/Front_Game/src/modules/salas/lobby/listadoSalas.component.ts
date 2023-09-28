import { Component, HostListener, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BreadcrumbDTO } from "src/modules/shared/models/breadcrums/breadcrumsDTO";
import { SignalServices } from "src/modules/shared/services/signalServices/signalServices";
import jwt_decode from 'jwt-decode';
import { Alerts } from "src/modules/shared/alertas/alerts";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { metaData } from "src/modules/shared/custom/metaData";
export let browserRefresh = false;

@Component({
    selector: 'listado-salas-component',
    templateUrl: './listadoSalas.component.html'
})
export class ListadoSalasComponent implements OnInit {
    //Variables
    public tokenObject: any;
    public usuarioInvitado: any;
    public metaData: metaData = new metaData();

    //Listas
    public breadcrumb: BreadcrumbDTO[] = [];
    public listadoSalas: any = [];

    constructor(public signalServices: SignalServices,
        private spinner: NgxSpinnerService,   
        private router: Router,
        private _cookie: CookieService) {
        this.breadcrumb.push({ nombre: "Salas" }, { nombre: "Lobby" });        
        this.tokenObject = jwt_decode(this._cookie.get('token'));
        this.signalServices.iniciarConexion(this.tokenObject.idUser, this.tokenObject.nombreUsuario, true);
    }
    async ngOnInit() {
        
        setTimeout(async () => {
            this.signalServices.recibirInvitacion();
            this.signalServices.rechazarAprobarInvitacionResponse();
            this.signalServices.obtenerUsuarios();
            this.signalServices.obtenerUsuariosRes();
        }, (5000));
        this.signalServices.emitirSolicitud.subscribe(async (usuarioObject: any) => {
            var result = await Alerts.confirm(usuarioObject.mensaje);
            var resultString = result == true ? "true" : "false";
            this.tokenObject.idUser = this.tokenObject.idUser.toString();
            this.signalServices.rechazarAprobarInvitacio(usuarioObject.idUsuarioInvita, this.tokenObject.idUser, resultString)
            this.spinner.hide();
            if (result == true) {
                var url = "inicio/salas/listado/salajuego/" + btoa(this.tokenObject.idUser) + "/" + window.btoa(usuarioObject.idUsuarioInvita);
                this.router.navigate([url])
            }
        })
        this.signalServices.rechazarAprobarInvitacionResponseEmit.subscribe(async (objectRespuesta: any) => {
            if (objectRespuesta.rechazoAprobarInvitacion == "true") {
                Alerts.success("Aceptado", "", "OK");
                var url = "inicio/salas/listado/salajuego/" + btoa(this.tokenObject.idUser) + "/" + window.btoa(objectRespuesta.idUsuario);
                this.router.navigate([url])
            } else {
                Alerts.Error("Rechazado", "", "OK");
            }
            this.spinner.hide();
        })
        this.signalServices.listaUsuariosEmit.subscribe(async (lista: any) => {
            lista = lista.filter((a: any) => a.id != this.tokenObject.idUser);
            this.listadoSalas = lista;
        })
    }    
    async invitarSala(usuario: any) {
        this.spinner.show();
        this.usuarioInvitado = usuario;
        this.signalServices.invitarJugar(this.usuarioInvitado.id, this.tokenObject.idUser, this.tokenObject.nombreUsuario);
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event: any) {
        var tokenObject: any = jwt_decode(this._cookie.get('token'));
        this.signalServices.desconectarUsuario(tokenObject.idUser);
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event: any) {
        return false;
    }
}