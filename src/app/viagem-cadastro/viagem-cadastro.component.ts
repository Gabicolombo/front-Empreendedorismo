import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CommonModule } from "@angular/common";
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-viagem-cadastro',
  templateUrl: './viagem-cadastro.component.html',
  styleUrls: ['./viagem-cadastro.component.css']
})
export class ViagemCadastroComponent implements OnInit, OnChanges {

  travelForm: any;
  token: string;
  step: any = 1;
  errorMessage: string;
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

  //checklists
  checklists = { Documentos: [{name: "Passaporte", status: false}, {name: "RG", status: false}, {name: "Reserva Hospedagem", status: false}],
                Roupas: [{name: "Blusa", status: false}, {name: "Calça", status: false}, {name: "Camiseta", status: false}],
                Acessorios: [{name: "Óculus", status: false}, {name: "Remédio", status: false}, {name: "Protetor Solar", status: false}],
                Eletronicos: [{name: "Celular", status: false},{name: "Carregador de Celular", status: false}, {name: "Adaptador de Tomada", status: false}]};

  newChecklistItem: boolean;
  newChecklistCategory: boolean;

  checklistBeingEdited: string;
  //Roteiro

  locais = []

  successPopup: boolean;

  constructor(private travelService:TravelService, private userService: UserService, private routes: Router, private router: ActivatedRoute) { }

  ngOnChanges(): void{

  }

  ngOnInit(): void {
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if(this.token == '') this.routes.navigate(['/Login']);

    this.travelForm = new FormGroup({
      nomeViagem: new FormControl(''),
      origem: new FormControl(''),
      destino: new FormControl(''),
      nomeEstadia: new FormControl(''),
      enderecoEstadia: new FormControl(''),
      participante: new FormControl(''),
      transporteIdaDateControl: new FormControl(''),
      transporteVoltaDateControl: new FormControl(''),
      checkInDateControl: new FormControl(''),
      checkOutDateControl: new FormControl(''),
      maximoGastos: new FormControl(''),
      enderecoLocal: new FormControl(''),
      descricaoLocal: new FormControl(''),
      dataVisita: new FormControl(''),
      checklistItemName: new FormControl(''),
      checklistCategoryName: new FormControl(''),

    });
  }

  createTravel(): void {

  }

  nextStep(): void {
    this.step++;
  }

  previousStep(): void {
    this.step--;
  }

  //Roteiro
  
  addLocation(): void {

    var data = this.travelForm.get('dataVisita').value;

    this.locais.push({
      dia: data.day,
      hora: data.hour,
      local: this.travelForm.get('enderecoLocal').value,
      descricao: this.travelForm.get('descricaoLocal').value
    })

    this.successPopup = true;
  }

  //Checklist

  openAddChecklistItemPopup(checklistCategoryName:string): void {

    this.newChecklistItem = true;
    this.checklistBeingEdited = checklistCategoryName;
  }
  
  addChecklistItem(): void{

    this.checklists[this.checklistBeingEdited].push({name: this.travelForm.get('checklistItemName').value, status: false});
    this.closeAddChecklistItemPopup();
  }

  closeAddChecklistItemPopup(): void {

    this.newChecklistItem = false;
  }

  openAddChecklistCategoryPopup(): void {

    this.newChecklistCategory = true;
  }

  addChecklistCategory(): void{

    this.checklists[this.travelForm.get('checklistCategoryName').value] = [];
    this.closeAddChecklistCategoryPopup();
  }


  closeAddChecklistCategoryPopup(): void {

    this.newChecklistCategory = false;
  }



  removeChecklistItem(checklistCategoryName: string, checklistItem: string): void {

    var removeIndex = this.checklists[checklistCategoryName].indexOf(checklistItem);
    this.checklists[checklistCategoryName].splice(removeIndex,1);
  }

  getChecklistsCategoryName(): Object[]{

    return Object.keys(this.checklists);
  }

  refresh(): void {
    window.location.reload();
  }

  addParticipant(): void {

  }

  submit(): void{

  }

  closeSuccessPopup(): void{

    this.successPopup = false;
    //recarregar tela
    this.step = 3;
  }

  clickChecklist(categoryName: string, itemIndex: number): void{
    
    console.log("Catrgory: " + categoryName);
    console.log("Item Index: " + itemIndex);
    var status = this.checklists[categoryName][itemIndex].status;
    this.checklists[categoryName][itemIndex].status = !status;
  }

  send(){
    console.log(this.travelForm.value);
    this.travelService.addTravel(this.travelForm.value, this.token).subscribe(res => { 
      this.routes.navigate(["/Home"]);
    }, err=>{
      this.errorMessage = err.error.message;
    });
  }
 
}
