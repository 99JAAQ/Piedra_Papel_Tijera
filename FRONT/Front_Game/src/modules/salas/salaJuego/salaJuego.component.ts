import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BreadcrumbDTO } from "src/modules/shared/models/breadcrums/breadcrumsDTO";
import { SignalServices } from "src/modules/shared/services/signalServices/signalServices";
import jwt_decode from 'jwt-decode';
import { Alerts } from "src/modules/shared/alertas/alerts";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { JugadorServices } from "src/modules/shared/services/rondas/rondas.services";
import { guardarPartidaDTO } from "src/modules/shared/models/jugadores/guardarPartidaDTO";

@Component({
    selector: 'sala-juego-component',
    templateUrl: './salaJuego.component.html',
    styleUrls: ['./salaJuego.component.css']
})
export class SalaJuegoComponent implements OnInit {
    public tokenObject: any;
    public usuarioInvitado: any;
    //Listas
    public breadcrumb: BreadcrumbDTO[] = [];
    public opciones: any[] = [
        {
            "img": "/assets/img/rock.png",
            "valor": "piedra",
            "seleccionado": false
        }, {
            "img": "/assets/img/paper.png",
            "valor": "papel",
            "seleccionado": false
        }, {
            "img": "/assets/img/scissors.png",
            "valor": "tijera",
            "seleccionado": false
        }
    ];
    public txtSeleccionado: any | null = null;
    public ocultarBoton: boolean = false;
    public idUsuarioRival: string = "";
    public respuestaRival: string | null = null;
    public objectRival: any | null = null;
    public ganadas: number = 0;
    public perdidas: number = 0;
    public resultado: string | null = null;
    public empate: boolean | null = false;
    public ganaRival: boolean | null = false;
    public ganoYo: boolean | null = false;
    constructor(public signalServices: SignalServices,
        private spinner: NgxSpinnerService,
        private activeRouter: ActivatedRoute,
        private router: Router,
        private servicioJugador: JugadorServices,
        private _cookie: CookieService) {
        this.ganadas = 0;
        this.perdidas = 0;
        this.breadcrumb.push({ nombre: "Salas" }, { nombre: "lobby" }, { nombre: "Sala juego" });
        this.signalServices = new SignalServices()
    }
    async ngOnInit() {
        await this.nuevaRonda();
        this.tokenObject = jwt_decode(this._cookie.get('token'));
        this.signalServices.iniciarConexion(this.tokenObject.idUser, this.tokenObject.nombreUsuario, true);
        var idParam = this.activeRouter.snapshot.paramMap.get('idUsuario2');
        this.idUsuarioRival = idParam == null ? "" : idParam;
        this.idUsuarioRival = window.atob(this.idUsuarioRival);
        setTimeout(async () => {
            this.signalServices.enviarJugadaResponse();
            this.signalServices.enviarResultadosJugadaResponse();
            this.signalServices.nuevaRondaResponse();
            this.signalServices.ganadorResponse();
        }, (5000));

        this.signalServices.jugadaEmit.subscribe(async (objectRespuesta: any) => {
            this.respuestaRival = objectRespuesta;
            this.objectRival = this.opciones.find(a => a.valor == this.respuestaRival);
            if (this.ocultarBoton == true) {
                var result = await this.compararJugadas(this.respuestaRival);
                this.signalServices.enviarResultadosJugada(this.idUsuarioRival, result?.idUsuario, result?.nombreUsuario);
                this.validarGanadores();
            }
        })
        this.signalServices.enviarJugadaResponseEmit.subscribe(async (objectRespuesta: any) => {
            if (objectRespuesta.nombreUsuarioGanador == "null") {
                this.empate = true;
            } else {
                if (this.idUsuarioRival == objectRespuesta.idUsuarioGanador) {
                    this.ganaRival = true;
                    this.perdidas = this.perdidas + 1;
                } else if (this.idUsuarioRival != objectRespuesta.idUsuarioGanador) {
                    this.ganadas = this.ganadas + 1;
                    this.ganoYo = true;
                }
            }
            setTimeout(async () => {
                this.signalServices.nuevaRonda(this.idUsuarioRival);
                await this.validarGanadores();
                await this.nuevaRonda();
            }, (5000));
        })
        this.signalServices.ganadorResponseEmit.subscribe(async () => {
            Alerts.Message("Has perdido el juego");
            this.regresar();
        })
        this.signalServices.nuevaRondaResponseEmit.subscribe(async () => {
            this.nuevaRonda();
        })
    }
    regresar() {
        setTimeout(async () => {
            this.router.navigate(["inicio/salas/lobby"])
        }, (5000));
    }
    guardarPartida() {
        var guardarDTO: guardarPartidaDTO = new guardarPartidaDTO();
        guardarDTO.winnerId = this.tokenObject.idUser;
        guardarDTO.player1Id = this.tokenObject.idUser;
        guardarDTO.player2Id = this.idUsuarioRival;

        console.log(guardarDTO,"guardarDTO")
        this.servicioJugador.guardarPartida(guardarDTO);
    }
    validarGanadores() {
        if (this.ganadas >= 3) {
            this.guardarPartida();
            Alerts.success("Has ganado el juego", "", "OK");
            this.signalServices.ganador(this.idUsuarioRival);
            this.nuevaRonda();
            this.regresar();
        }
    }
    nuevaRonda() {
        this.ocultarBoton = false;
        this.txtSeleccionado = null;
        this.respuestaRival = null;
        this.objectRival = null;
        this.empate = false;
        this.ganoYo = false;
        this.ganaRival = false;
        this.opciones.forEach(a => a.seleccionado = false);
    }
    seleccionar(value: any) {
        if (this.ocultarBoton == false) {
            this.opciones.forEach(a => a.seleccionado = false);
            value.seleccionado = true;
            this.txtSeleccionado = value.valor;
        }
    }
    compararJugadas(jugadaRival: string | null): any {
        var json = {
            "idUsuario": "",
            "nombreUsuario": "",
        }
        //Igual
        if (jugadaRival == this.txtSeleccionado) {
            json.idUsuario = "null";
            json.nombreUsuario = "null";
            this.empate = true;
            return json;
        }
        //piedra papel
        if (jugadaRival == "piedra" && this.txtSeleccionado == "papel") {
            json.idUsuario = this.tokenObject.idUser;
            this.ganoYo = true;
            this.ganadas = this.ganadas + 1;
            return json;
        }
        //Papel piedra
        if (jugadaRival == "papel" && this.txtSeleccionado == "piedra") {
            json.idUsuario = this.idUsuarioRival;
            this.perdidas = this.perdidas + 1;
            this.ganaRival = true;
            return json;
        }
        //piedra tijeras
        if (jugadaRival == "piedra" && this.txtSeleccionado == "tijera") {
            json.idUsuario = this.idUsuarioRival;
            this.perdidas = this.perdidas + 1;
            this.ganaRival = true;
            return json;
        }
        //tijeras piedra
        if (jugadaRival == "tijera" && this.txtSeleccionado == "piedra") {
            json.idUsuario = this.tokenObject.idUser;
            this.ganoYo = true;
            this.ganadas = this.ganadas + 1;
            return json;
        }
        //papel tijeras     
        if (jugadaRival == "papel" && this.txtSeleccionado == "tijera") {
            json.idUsuario = this.tokenObject.idUser;
            this.ganoYo = true;
            this.ganadas = this.ganadas + 1;
            return json;
        }
        //tijeras papel  
        if (jugadaRival == "tijera" && this.txtSeleccionado == "papel") {
            json.idUsuario = this.idUsuarioRival;
            this.perdidas = this.perdidas + 1;
            this.ganaRival = true;
            return json;
        }
        return null;
    }
    jugar() {
        try {
            if (this.txtSeleccionado == null) throw "Es obligatorio una opción";
            this.ocultarBoton = true;
            this.signalServices.enviarJugada(this.idUsuarioRival, this.txtSeleccionado);
        } catch (error: any) {
            Alerts.Error("Error", error, "ok");
        }
    }
}