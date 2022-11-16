import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user';
import { Travel } from '../models/travel';
import { CheckList } from '../models/checklist';
import { Obj } from '@popperjs/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string;
  travels: Travel[] = [];
  // plans: any[] = [];
  checklist: CheckList[] = [];

  constructor(private routes: Router, private travelService: TravelService,
   private userService: UserService, private router: ActivatedRoute ) { }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });

    if(this.token == '') this.routes.navigate(['/Login']);

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
        console.log(this.travels);
      });

    // this.userService.getUsuario(this.token)
    //   .subscribe(res => {
    //     const checklist = res.checklist.map((data:any) => ({
    //       id: data.id,
    //       viagem: data.viagem,
    //       status: data.status,
    //       descricao: data.descricao,
    //       categoria: data.categoria,
    //     }));
    //     this.checklist = checklist;
    //     console.log(checklist);
    //     console.log(this.checklist);
    //   });
  }

  deleteTravel(id: any){
    this.travelService.deleteTravels(id, this.token);
  }

  newTravel(){
    this.routes.navigate(['/CadastroViagem/Page1']);
  }

}
