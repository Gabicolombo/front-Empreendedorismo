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
  checklist: CheckList[] = [];
  idTravel: any;

  constructor(private routes: Router, private userService: UserService, private activatedRoute: ActivatedRoute,
    private checklistService: CheckListService, private travelService: TravelService) { }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if(this.token == '') this.routes.navigate(['/Login']);

    this.idTravel = this.activatedRoute.snapshot.paramMap.get("id");

    this.travelService.getTravel(this.token,this.idTravel)
      .subscribe( (res: any)=> {
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
      });

      this.checklistService.getChecklistById(this.idTravel,this.token)
      .subscribe(res => {
        const checklist = res.map((data:any) => ({
          categoria: data._id,
          info: data.info,
        }));
       
        this.checklist = checklist;

      });

  }
 
  isChecked(id: any, selected: boolean){
    let body = {
      status: selected
    };

    this.checklistService.updateChecklist(id, this.token, body);
  }

  orcamentoTravel(){
    
    this.routes.navigate(['Orcamento', this.activatedRoute.snapshot.paramMap.get("id")]);
  }

  irPraHome(){
    this.routes.navigate(['/Home']);
  }

  
}
