import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
// import { CarouselModule } from 'ng-carousel-cdk';
// import { MatCarouselModule } from '@ngmodule/material-carousel'

import {MaterialExampleModule} from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { routerConfig } from './app.routes';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ViagemComponent } from './viagem/viagem.component';
import { UserService } from './services/user.service';
import { TravelService } from './services/travels.service';
import { CheckListService } from './services/checklist.service';
import { HomeComponent } from './home/home.component';
import { ViagemCadastroComponent } from './viagem-cadastro/viagem-cadastro.component';
import { HomeOrcamentoComponent } from './home-orcamento/home-orcamento.component';

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
    ViagemCadastroComponent,
    HomeOrcamentoComponent,
    ViagemComponent,
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
    MatIconModule,
    [RouterModule.forRoot(routerConfig, {useHash: false}), BrowserAnimationsModule],
    // CarouselModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  exports:[
    MatIconModule
  ],
  providers: [UserService, TravelService, CheckListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
