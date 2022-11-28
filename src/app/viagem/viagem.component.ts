import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { Travel } from '../models/travel';
import { CheckList } from '../models/checklist';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckListService } from '../services/checklist.service';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {
  travel = {
    nome: '',
    origem: '',
    destino: '',
    dataInicio:'',
    dataFim:'',
    transportes: [],
    participantes: [],
    hotel: [],
    roteiro: [],
    checklist: []
  };
  token: string;
  travels: Travel[] = [];


  constructor(private routes: Router, private userService: UserService, private activatedRoute: ActivatedRoute,
    private checklistService: CheckListService, private travelService: TravelService) { }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if(this.token == '') this.routes.navigate(['/Login']);

    this.travelService.getTravel(this.token,'638235058292108035f33ad1')
      .subscribe( (res: any )=> {
        this.travel.nome = res[0].nome
        this.travel.origem = res[0].origem
        this.travel.destino = res[0].destino
        this.travel.dataFim = res[0].dataFim
        this.travel.dataInicio = res[0].dataInicio
        this.travel.transportes = res[0].transportes
        this.travel.participantes = res[0].participantes
        this.travel.roteiro = res[0].roteiro
        this.travel.checklist = res[0].checklist
        this.travel.hotel = res[0].hotel
        console.log(res);
        console.log(this.travel.origem);
      })

  }
 
  isChecked(id: any, selected: boolean){
    let body = {
      status: selected
    };

    this.checklistService.updateChecklist(id, this.token, body);
  }

  orcamentoTravel(){
    this.routes.navigate(['/Home/Orcamento']);
  }

  irPraHome(){
    this.routes.navigate(['/Home']);
  }


}
