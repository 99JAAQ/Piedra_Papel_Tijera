import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { AuthInterceptorService } from 'src/modules/shared/services/authInterceptorService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { servicesLogin } from 'src/modules/shared/services/services.login';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JwtModule } from "@auth0/angular-jwt";
import { CmpCrearUsuario } from './views/login/components/crearUsuario/crearUsuario.component';
import { MatPaginatorModule } from '@angular/material/paginator';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CmpCrearUsuario
  ],
  imports: [        
    BrowserModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,    
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,        
    FormsModule,    
    RouterModule.forRoot(routes),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,        
      },
    }),
  ],
  providers: [
    CookieService,
    servicesLogin,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
