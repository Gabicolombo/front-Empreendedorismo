import { Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeComponent } from "./home/home.component";


export const routerConfig: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastro', component: CadastroComponent},
  {path: 'Home', component: HomeComponent}
]
