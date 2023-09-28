import { Component, Input, OnInit } from "@angular/core";
import { BreadcrumbDTO } from "../models/breadcrums/breadcrumsDTO";

@Component({
    selector: 'breadcrumb-component',
    templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

    @Input() inplsbreadcrumb: BreadcrumbDTO[] = [];

    constructor() {
    }
    ngOnInit(): void {        
    }
    async crearReporte() {

    }
}