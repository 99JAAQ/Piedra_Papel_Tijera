import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { metaData } from "../../custom/metaData";
import { Errores } from "../errores.services";
import { guardarPartidaDTO } from "../../models/jugadores/guardarPartidaDTO";
import { queryFilterJugadoresDTO } from "../../models/jugadores/queryFilterJugadoresDTO";

@Injectable({
    providedIn: 'root'
})
export class JugadorServices {
    url: string;
    constructor(private http: HttpClient) {
        this.url = environment.url;
    }
    guardarPartida(partida: guardarPartidaDTO) {
        return new Promise<boolean>((resolve, reject) => {
            this.http.post<boolean>(`${environment.url}api/round/AddRound`, partida).subscribe({
                next: (data: boolean) => {
                    resolve(data);
                },
                error: (error: any) => {
                    var result = Errores.obtenerErrores(error);
                    reject(result);
                }
            });
        });
    }
}