import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';
import { Travel } from '../models/travel';
import { CheckList } from '../models/checklist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {

  token: string;

  constructor(private routes: Router, private userService: UserService) { }

  ngOnInit(): void {
    // verificando se o usuário está autenticado
    this.userService.token.subscribe(value => {
      this.token = value
    });
  }

  orcamentoTravel(){
    this.routes.navigate(['/Home/Orcamento']);
  }

}
