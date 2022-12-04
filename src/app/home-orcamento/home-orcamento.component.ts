import { Component, OnInit, Input } from '@angular/core';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Travel } from '../models/travel';
import { CheckList } from '../models/checklist';
import { CheckListService } from '../services/checklist.service';

@Component({
  selector: 'app-home-orcamento',
  templateUrl: './home-orcamento.component.html',
  styleUrls: ['./home-orcamento.component.css']
})
export class HomeOrcamentoComponent implements OnInit {
  @Input() travel: Travel;
  @Input() index: number;

  token: string;
  travels: Travel[] = [];
  checklist: CheckList[] = [];
  budgetTravel: Travel;
  idTravel: any;

  constructor(private routes: Router, private checklistService: CheckListService, private travelService: TravelService,
  private userService: UserService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if(this.token == '') this.routes.navigate(['/Login']);

    this.idTravel = this.route.snapshot.paramMap.get("id");

    this.travelService.getBudget(this.token, this.idTravel)
      .subscribe(res => {
        const budgetTravel = res.map((data:any) => ({
          id: data._id,
          alimentos: data.alimentos,
          gasto_total: data.gasto_total,
          transporte: data.transporte,
          hospedagem: data.hospedagem,
          nome: data.nome,
          objetos: data.objetos,
          outros: data.outros,
          saude: data.saude,
          total_disponivel: data.total_disponivel
        }));

        this.budgetTravel = budgetTravel;
      });

    this.travelService.getTravels(this.token)
      .subscribe(res => {
        const travels = res.data.map((data:any) => ({
          nome: data.nome,
          origem: data.origem,
          destino: data.destino,
          dataFim: data.dataFim,
          dataInicio: data.dataInicio,
          roteiro: data.roteiro,
          id: data._id
        }));

        this.travels = travels;

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

  goHome(){
    this.routes.navigate(['/Home']);
  }


}
