import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { routerConfig } from './app.routes';
import { CadastroComponent } from './cadastro/cadastro.component';

import { UserService } from './services/user';
import { HomeComponent } from './home/home.component';
import { ViagemCadastroPage1Component } from './viagem-cadastro-page1/viagem-cadastro-page1.component';
import { HomeOrcamentoComponent } from './home-orcamento/home-orcamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    ViagemCadastroPage1Component,
    HomeOrcamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    [RouterModule.forRoot(routerConfig, {useHash: false})]
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
