import { Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from "./cadastro/cadastro.component";


export const routerConfig: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastro', component: CadastroComponent}
]
