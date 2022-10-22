import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { VacationService } from '../services/vacations.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Vacation } from '../models/vacation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string;
  travels: Vacation[] = [];

  constructor(private routes: Router, private vacationService: VacationService,
   private userService: UserService ) { }

  ngOnInit(): void {
    console.log(this.userService.token);
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      console.log(value);
      this.token = value
    });

    console.log('this.token: ', this.token);
    if(this.token == '') this.routes.navigate(['/Login']);

    this.vacationService.getTravels(this.token)
      .subscribe(res => {
        console.log(res);
        const travels = res.data.map((data:any) => ({
          nome: data.nome,
          origem: data.origem,
          destino: data.destino,
          dataFim: data.dataFim,
          dataInicio: data.dataInicio
        }));

        this.travels = travels;
        console.log(this.travels);
      })

  }

}
