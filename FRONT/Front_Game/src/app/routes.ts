import { Routes } from "@angular/router";
import { AuthGuard } from "src/modules/shared/guards/authGuard";
import { guardLogin } from "src/modules/shared/guards/guard.login";
import { InicioComponent } from "./views/inicio/inicio.component";
import { LoginComponent } from "./views/login/login.component";
import { routes as navigationSalas } from 'src/modules/salas/salas.module';
import { CmpCrearUsuario } from "./views/login/components/crearUsuario/crearUsuario.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guardLogin],
  },
  {
    path: 'crearusuario',
    component: CmpCrearUsuario,
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
    children: [      
      ...navigationSalas
    ]
  }
]

