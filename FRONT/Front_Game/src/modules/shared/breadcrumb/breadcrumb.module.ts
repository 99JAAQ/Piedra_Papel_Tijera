import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BreadcrumbComponent } from "./breadcrumb.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        BreadcrumbComponent,
    ],
    exports:
        [
            BreadcrumbComponent
        ]

})
export class BreadcrumbModule {
}