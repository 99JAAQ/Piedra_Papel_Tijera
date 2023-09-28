import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [        
        MatPaginatorModule
    ],
    declarations: [
        PaginationComponent
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useValue: CustomPaginator()
        }
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule {
}

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Seleccionar cantidad';
    customPaginatorIntl.nextPageLabel = "Página siguiente";
    customPaginatorIntl.previousPageLabel = "Página anterior";
    return customPaginatorIntl;
}