
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
    selector: 'spinner-component',
    templateUrl: './spinner.component.html',
    standalone: true,
    imports: [NgxSpinnerModule]
})
export class SpinnerStandComponent implements OnInit {
    constructor() {        
    }
    async ngOnInit(){

    }
}