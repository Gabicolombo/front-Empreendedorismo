import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viagem-cadastro-page1',
  templateUrl: './viagem-cadastro-page1.component.html',
  styleUrls: ['./viagem-cadastro-page1.component.css']
})
export class ViagemCadastroPage1Component implements OnInit {

  travelForm: any;
  startDate = new Date(2022, 0, 2);
  nome_viagem:string = "";
  origem:string = "";
  destino:string = "";
  nome_estadia:string = "";
  endereco_estadia:string = "";
  participante:string = "";

  constructor() { }

  ngOnInit(): void {
    this.travelForm = new FormGroup({
      nome_viagem: new FormControl(''),
      origem: new FormControl(''),
      destino: new FormControl(''),
      nome_estadia: new FormControl(''),
      endereco_estadia: new FormControl(''),
      participante: new FormControl(''),
    });
  }

  createTravel(): void {

  }
}
