import { Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { HomeComponent } from "./home/home.component";
import { ViagemCadastroComponent } from "./viagem-cadastro/viagem-cadastro.component";
import { HomeOrcamentoComponent } from './home-orcamento/home-orcamento.component';


export const routerConfig: Routes = [
  { path: '', redirectTo: (localStorage.getItem('token') != null ? '/Home' : '/Login'), pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastro', component: CadastroComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'CadastroViagem', component: ViagemCadastroComponent },
  {path: 'Orcamento/:id', component: HomeOrcamentoComponent}
]
