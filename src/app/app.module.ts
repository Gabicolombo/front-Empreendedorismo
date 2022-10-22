import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';

import {MaterialExampleModule} from '../material.module';
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

import {
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker';

@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    ViagemCadastroPage1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MatNativeDateModule,
    MaterialExampleModule,
    [RouterModule.forRoot(routerConfig, {useHash: false}),
    BrowserAnimationsModule
  ],
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
