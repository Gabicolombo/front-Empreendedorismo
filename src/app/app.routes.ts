import { Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeComponent } from "./home/home.component";
import { ViagemCadastroPage1Component } from "./viagem-cadastro-page1/viagem-cadastro-page1.component";


export const routerConfig: Routes = [
  { path: '', redirectTo: (localStorage.getItem('token') != null ? '/Home' : '/Login'), pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastro', component: CadastroComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'CadastroViagem/Page1', component: ViagemCadastroPage1Component}
]
