
import { CookieService } from "ngx-cookie-service";
import { BreadcrumbModule } from "../shared/breadcrumb/breadcrumb.module";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerStandComponent } from "../shared/spinner/spinner.component";
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { ListadoSalasComponent } from "./lobby/listadoSalas.component";
import { SalaJuegoComponent } from "./salaJuego/salaJuego.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCommonModule } from "@angular/material/core";
import { AuthInterceptorService } from "../shared/services/authInterceptorService";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {  NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginationModule } from "../shared/pagination/pagination.module";
import { HomeComponent } from "src/app/views/home/home.component";


export const routes: Routes = [
    {
        path: 'salas/lobby',
        component: ListadoSalasComponent,        
    },
    {
        path: 'salas/listado/salajuego/:idUsuario1/:idUsuario2',
        component: SalaJuegoComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];

@NgModule({
    imports: [           
        BrowserModule,   
        MatCommonModule,
        BreadcrumbModule,        
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,        
        PaginationModule,
        MatInputModule,
        CommonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxSpinnerModule,
        MatSlideToggleModule,
        SpinnerStandComponent,
        MatButtonModule,
    ],
    declarations: [
        ListadoSalasComponent,
        SalaJuegoComponent,
        HomeComponent
    ],
    exports:
        [
            
        ],
    providers: [        
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
    ],
})
export class SalasModule {
}
