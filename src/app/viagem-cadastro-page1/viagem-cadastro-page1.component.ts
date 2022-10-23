import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-viagem-cadastro-page1',
  templateUrl: './viagem-cadastro-page1.component.html',
  styleUrls: ['./viagem-cadastro-page1.component.css']
})
export class ViagemCadastroPage1Component implements OnInit, OnChanges {

  travelForm: any;
  transporteIdaDateControl: any;
  transporteVoltaDateControl: any;
  checkInDateControl: any;
  checkOutDateControl: any;

  nome_viagem:string = "";
  origem:string = "";
  destino:string = "";
  nome_estadia:string = "";
  endereco_estadia:string = "";
  participante:string = "";

  //Date Picker
  minDate:Date = new Date(Date.now());
  maxDate:Date;
  disabled:boolean = false;

  showSpinners:boolean = true;
  stepHour:number = 1;
  stepMinute:number = 1;
  stepSecond:number = 1;
  defaultTime:number[] = [12, 0, 0]
  showSeconds:boolean = false;
  hideTime:boolean = false;
  disableMinute:boolean = false;
  touchUi:boolean = true;
  color:ThemePalette;
  enableMeridian:boolean = false;

  //Datas
  transporteIdaDate:Date;
  transporteVoltaDate:Date;
  checkInDate:Date;
  checkOutDate:Date;


  constructor() { }

  ngOnChanges(): void{

  }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      nome_viagem: new FormControl(''),
      origem: new FormControl(''),
      destino: new FormControl(''),
      nome_estadia: new FormControl(''),
      endereco_estadia: new FormControl(''),
      participante: new FormControl(''),
      transporteIdaDateControl: new FormControl(''),
      transporteVoltaDateControl: new FormControl(''),
      checkInDateControl: new FormControl(''),
      checkOutDateControl: new FormControl(''),
    });
  }

  createTravel(): void {

  }
}
