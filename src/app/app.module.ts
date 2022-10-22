import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { routerConfig } from './app.routes';
import { CadastroComponent } from './cadastro/cadastro.component';

import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { VacationService } from './services/vacations.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MatIconModule,
    [RouterModule.forRoot(routerConfig, {useHash: false})]
  ],
  exports:[
    MatIconModule
  ],
  providers: [UserService, VacationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
