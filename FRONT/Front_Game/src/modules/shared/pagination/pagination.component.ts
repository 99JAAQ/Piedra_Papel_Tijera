import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { environment } from "src/environments/environment";
import { clsPaginacion } from "../custom/clsPaginacion";


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {    
    public pageSize = environment.pageSize;
    @Output() cambiarPagina = new EventEmitter<clsPaginacion>();
    @Input() cantidadDatos: number | null = 0;
    @Input() index: number = 1;
    constructor() {
    }
    async ngOnInit() {        
    }

    async pagina(event: any) {        
        var PageSize = event.pageSize;
        var PageNumber = event.pageIndex + 1;
        var nuevosDatos: clsPaginacion = new clsPaginacion();
        nuevosDatos.PageNumber = PageNumber;
        nuevosDatos.PageSize = PageSize;
        this.cambiarPagina.emit(nuevosDatos);
    }
}