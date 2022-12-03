import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CommonModule } from "@angular/common";
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viagem-cadastro',
  templateUrl: './viagem-cadastro.component.html',
  styleUrls: ['./viagem-cadastro.component.css']
})
export class ViagemCadastroComponent implements OnInit, OnChanges {

  token: string;
  errorMessage: string;
  travelForm: any;

  step: any = 1;
  //Date Picker
  minDate: Date = new Date(Date.now());
  maxDate: Date;
  disabled: boolean = false;

  showSpinners: boolean = true;
  stepHour: number = 1;
  stepMinute: number = 1;
  stepSecond: number = 1;
  defaultTime: number[] = [12, 0, 0]
  showSeconds: boolean = false;
  hideTime: boolean = false;
  disableMinute: boolean = false;
  touchUi: boolean = true;
  color: ThemePalette;
  enableMeridian: boolean = false;

  //Datas
  transporteIdaDate: Date;
  transporteVoltaDate: Date;
  checkInDate: Date;
  checkOutDate: Date;

  //checklists
  checklists = {
    Documentos: [{ name: "Passaporte", status: false }, { name: "RG", status: false }, { name: "Reserva Hospedagem", status: false }],
    Roupas: [{ name: "Blusa", status: false }, { name: "Calça", status: false }, { name: "Camiseta", status: false }],
    Acessorios: [{ name: "Óculus", status: false }, { name: "Remédio", status: false }, { name: "Protetor Solar", status: false }],
    Eletronicos: [{ name: "Celular", status: false }, { name: "Carregador de Celular", status: false }, { name: "Adaptador de Tomada", status: false }]
  };

  newChecklistItem: boolean;
  newChecklistCategory: boolean;

  checklistBeingEdited: string;
  //Roteiro

  locais = []

  successPopup: boolean;

  constructor(private routes: Router, private travelService: TravelService,
    private userService: UserService) { }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if (this.token == '') this.routes.navigate(['/Login']);

    this.travelForm = new FormGroup({
      nomeViagem: new FormControl(''),
      origem: new FormControl(''),
      destino: new FormControl(''),
      nomeEstadia: new FormControl(''),
      enderecoEstadia: new FormControl(''),
      participante: new FormControl(''),
      transporteIdaDateControl: new FormControl(''),
      transporteVoltaDateControl: new FormControl(''),
      transporteIdaTipo: new FormControl(''),
      transporteIdaDescricao: new FormControl(''),
      transporteVoltaTipo: new FormControl(''),
      transporteVoltaDescricao: new FormControl(''),
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

    var transporteDataIda = new Date(this.travelForm.get('transporteIdaDateControl').value);
    var transporteDataVolta = new Date(this.travelForm.get('transporteVoltaDateControl').value);
    var dataVisita = new Date(this.travelForm.get('visitaDate').value);
    var checkInData = new Date(this.travelForm.get('checkInDateControl').value);
    var checkOutData = new Date(this.travelForm.get('checkOutDateControl').value);
    var checklists = [];
    console.log(transporteDataIda);
    var checklistCategories = Object.keys(this.checklists);

    for (var i = 0; i < checklistCategories.length; i++) {
      for (var j = 0; j < this.checklists[checklistCategories[i]].length; j++) {
        checklists.push({
          status: this.checklists[checklistCategories[i]][j].status,
          descricao: this.checklists[checklistCategories[i]][j].name,
          categoria: checklistCategories[i]
        });
      }
    }

    var travel = {
      nome: this.travelForm.get('nomeViagem').value,
      origem: this.travelForm.get('origem').value,
      destino: this.travelForm.get('destino').value,
      total_disponivel: this.travelForm.get('maximoGastos').value,
      dataInicio: transporteDataIda.getDay() + '/' + transporteDataIda.getMonth() + '/' + transporteDataIda.getFullYear(),
      dataFim: transporteDataVolta.getDay() + '/' + transporteDataVolta.getMonth() + '/' + transporteDataVolta.getFullYear(),
      hotel: [{
        nome: this.travelForm.get('nomeEstadia').value,
        endereco: this.travelForm.get('enderecoEstadia').value,
        check_in: "dia " + checkInData.getDay() + " - " + checkInData.getHours() + "hs",
        check_out: "dia " + checkOutData.getDay() + " - " + checkOutData.getHours() + "hs"
      }],
      transportes: [{
        tipo: this.travelForm.get('transporteIdaTipo').value,
        descricao: this.travelForm.get('transporteIdaDescricao').value,
        horario: transporteDataIda.getTime() + "hs",
        caminho: "ida",
        data: transporteDataIda.getDay() + '/'  + transporteDataIda.getMonth() + '/' + transporteDataIda.getFullYear()
      },
      {
        tipo: this.travelForm.get('transporteVoltaTipo').value,
        descricao: this.travelForm.get('transporteVoltaDescricao').value,
        horario: transporteDataVolta.getHours() + "hs",
        caminho: "volta",
        data: transporteDataVolta.getDay() + '/' + transporteDataVolta.getMonth() + '/' + transporteDataVolta.getFullYear()
      }],
      roteiro: [{
        local: this.locais,
        dia: dataVisita.getDay(),
        hora: dataVisita.getHours(),
        descricao: this.travelForm.get('descricaoLocal').value,
      }],
      gastos: {
        alimentos: 299,
        transporte: 560,
        hospedagem: 129,
        objetos: 82,
        saude: 29,
        outros: 19
      },
      checklists: checklists

    };
    console.log(travel);
    this.travelService.addTravel(travel, this.token).subscribe(res => {
      this.routes.navigate(["/Home"]);
    }, err => {
      this.errorMessage = err.error.message;
    });;
    this.routes.navigate(['/Home']);
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

  openAddChecklistItemPopup(checklistCategoryName: string): void {

    this.newChecklistItem = true;
    this.checklistBeingEdited = checklistCategoryName;
  }

  addChecklistItem(): void {

    this.checklists[this.checklistBeingEdited].push({ name: this.travelForm.get('checklistItemName').value, status: false });
    this.closeAddChecklistItemPopup();
  }

  closeAddChecklistItemPopup(): void {

    this.newChecklistItem = false;
  }

  openAddChecklistCategoryPopup(): void {

    this.newChecklistCategory = true;
  }

  addChecklistCategory(): void {

    this.checklists[this.travelForm.get('checklistCategoryName').value] = [];
    this.closeAddChecklistCategoryPopup();
  }


  closeAddChecklistCategoryPopup(): void {

    this.newChecklistCategory = false;
  }



  removeChecklistItem(checklistCategoryName: string, checklistItem: string): void {

    var removeIndex = this.checklists[checklistCategoryName].indexOf(checklistItem);
    this.checklists[checklistCategoryName].splice(removeIndex, 1);
  }

  getChecklistsCategoryName(): Object[] {

    return Object.keys(this.checklists);
  }

  refresh(): void {
    window.location.reload();
  }

  addParticipant(): void {

  }

  closeSuccessPopup(): void {

    this.successPopup = false;
    //recarregar tela
    this.step = 3;
  }

  clickChecklist(categoryName: string, itemIndex: number): void {

    console.log("Catrgory: " + categoryName);
    console.log("Item Index: " + itemIndex);
    var status = this.checklists[categoryName][itemIndex].status;
    this.checklists[categoryName][itemIndex].status = !status;
  }

}