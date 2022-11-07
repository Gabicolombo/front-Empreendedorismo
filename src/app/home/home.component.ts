import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Travel } from '../models/travel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string;
  travels: Travel[] = [];
  plans: any[] = [];

  constructor(private routes: Router, private travelService: TravelService,
   private userService: UserService ) { }

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
          roteiro: data.roteiro
        }));

        this.travels = travels;
      })
  }

  getPlan(){
    console.log(this.travels);
    const plans = this.travels.map((data:any) => ({
      dia: data.roteiro.dia,
    }));

    console.log(plans);
  }

  newTravel(){
    this.routes.navigate(['/CadastroViagem/Page1']);
  }

}
