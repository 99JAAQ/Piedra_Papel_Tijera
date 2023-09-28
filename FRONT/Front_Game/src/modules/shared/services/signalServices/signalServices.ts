import { EventEmitter, Injectable } from "@angular/core";
import * as signalR from '@aspnet/signalr';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class SignalServices {
    emitirSolicitud: EventEmitter<any> = new EventEmitter();
    rechazarAprobarInvitacionResponseEmit: EventEmitter<any> = new EventEmitter();
    jugadaEmit: EventEmitter<any> = new EventEmitter();
    enviarJugadaResponseEmit: EventEmitter<any> = new EventEmitter();
    nuevaRondaResponseEmit: EventEmitter<any> = new EventEmitter();
    ganadorResponseEmit: EventEmitter<any> = new EventEmitter();
    listaUsuariosEmit: EventEmitter<any> = new EventEmitter();

    conexion: any = signalR.HubConnection;
    constructor() {
        this.conexion = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.baseUrl}signalhub`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
    }
    
    async iniciarConexion(id: any, nombre: string, conectar: boolean) {
        this.conexion.start().then(() => {
            if (conectar == true) {
                this.registrarSala(id, nombre);
            } else {
                this.desconectarUsuario(id);
            }
        }).catch((err: any) => {
            console.log("ERROR" + err)
        });
    }
    async desconectarUsuario(id: any) {
        this.conexion.invoke("desconectarUsuario", id);
    }    
    registrarSala(id: any, nombre: string) {
        this.conexion.invoke("registrarSala", id, nombre)
            .catch((err: any) => console.log(err))
    }

    invitarJugar(idUsuarioDestino: string, idUsuarioInvita: string, nombreUsuarioInvita: string) {
        this.conexion.invoke("invitarJugar", idUsuarioDestino.toString(), idUsuarioInvita.toString(), nombreUsuarioInvita)
            .catch((err: any) => console.log(err))
    }
    recibirInvitacion() {
        this.conexion.on("invitarJugarResponse", (nombreUsuarioInvita: any, idUsuarioInvita: any) => {
            var json = {
                "mensaje": nombreUsuarioInvita + " te ha desafiado a jugar, ¿aceptas?",
                "idUsuarioInvita": idUsuarioInvita
            }
            this.emitirSolicitud.emit(json);
        })
    }
    rechazarAprobarInvitacio(idUsuarioDestino: string, idUsuario: string, tipoInvitacion: string) {
        //Aprobar o rechazar una invitación                
        this.conexion.invoke("rechazarAprobarInvitacion", idUsuarioDestino, idUsuario, tipoInvitacion).catch((err: any) => console.log(err))
    }
    rechazarAprobarInvitacionResponse() {
        this.conexion.on("rechazarAprobarInvitacionResponse", (idUsuario: any, rechazoAprobarInvitacion: any) => {
            var json = {
                "idUsuario": idUsuario,
                "rechazoAprobarInvitacion": rechazoAprobarInvitacion
            }            
            this.rechazarAprobarInvitacionResponseEmit.emit(json);
        })
    }

    enviarJugada(idUsuarioDestino: string, jugada: string) {
        this.conexion.invoke("enviarJugada", idUsuarioDestino, jugada).catch((err: any) => console.log(err))
    }
    enviarJugadaResponse() {
        this.conexion.on("enviarJugadaResponse", (jugada: any) => {
            this.jugadaEmit.emit(jugada);
        })
    }
    enviarResultadosJugada(idUsuarioDestino: string, idUsuarioGanador: string, nombreUsuarioGanador: string) {
        this.conexion.invoke("enviarResultadosJugada", idUsuarioDestino, idUsuarioGanador, nombreUsuarioGanador).catch((err: any) => console.log(err))
    }
    enviarResultadosJugadaResponse() {
        this.conexion.on("enviarResultadosJugadaResponse", (idUsuarioGanador: any, nombreUsuarioGanador: any) => {
            var json = {
                "idUsuarioGanador": idUsuarioGanador,
                "nombreUsuarioGanador": nombreUsuarioGanador
            }
            this.enviarJugadaResponseEmit.emit(json);
        })
    }
    nuevaRonda(idUsuarioDestino: string) {
        this.conexion.invoke("nuevaRonda", idUsuarioDestino).catch((err: any) => console.log(err))
    }
    nuevaRondaResponse() {
        this.conexion.on("nuevaRondaResponse", () => {
            this.nuevaRondaResponseEmit.emit();
        })
    }
    ganador(idUsuarioDestino: string) {
        this.conexion.invoke("ganadorRonda", idUsuarioDestino).catch((err: any) => console.log(err))
    }
    ganadorResponse() {
        this.conexion.on("ganadorResponse", () => {
            this.ganadorResponseEmit.emit();
        })
    }   

    obtenerUsuarios() {
        this.conexion.invoke("obtenerUsuariosSala").catch((err: any) => console.log(err))
    }
    obtenerUsuariosRes() {
        this.conexion.on("obtenerUsuariosResponse", (lista: any) => {
            this.listaUsuariosEmit.emit(lista);
        })
    }
}