import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Travel } from '../models/travel';
import { TravelService } from '../services/travels.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-viagem-cadastro-page1',
  templateUrl: './viagem-cadastro-page1.component.html',
  styleUrls: ['./viagem-cadastro-page1.component.css']
})
export class ViagemCadastroPage1Component implements OnInit, OnChanges {

  //Current User
  userToken: string;
  user: User;

  travelForm: any;

  //Date Picker Configuration Variables
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

  constructor(private routes: Router, private travelService: TravelService,
    private userService: UserService ) { }

  ngOnInit(): void {

    // Assure user is logged in
    this.userService.token.subscribe(value => {
      this.userToken = value
    });
    if(this.userToken == '') this.routes.navigate(['/Login']);

    this.travelForm = new FormGroup({
      nome_viagem: new FormControl(''),
      origem: new FormControl(''),
      destino: new FormControl(''),
      transporte_ida_tipo: new FormControl(''),
      transporte_ida_date: new FormControl(''),
      transporte_ida_descricao: new FormControl(''),
      transporte_volta_tipo: new FormControl(''),
      transporte_volta_descricao: new FormControl(''),
      transporte_volta_date: new FormControl(''),
      nome_estadia: new FormControl(''),
      endereco_estadia: new FormControl(''),
      participante: new FormControl(''),
      checkin_date: new FormControl(''),
      checkout_date: new FormControl(''),
    });
  }

  ngOnChanges(): void{

  }

  createTravel(): void {



      //get user
      this.userService.getUsuario(this.userToken).subscribe( (user) =>{
        this.setUser(user);
      }
      );

      //Trasportes
      const transportes =  [
        {
          id: 0,
          tipo: this.travelForm?.get('transporte_ida_tipo').value,
          descricao: this.travelForm?.get('transporte_ida_descricao').value,
          data: this.travelForm?.get('transporte_ida_date').value,
          caminho: "ida"
        },
        {
          id: 1,
          tipo: this.travelForm?.get('transporte_volta_tipo').value,
          descricao: this.travelForm?.get('transporte_volta_descricao').value,
          data: this.travelForm?.get('transporte_volta_date').value,
          caminho: "volta"
        }
      ]

      //Estadia
      const hotel = [
          {
            id: 0,
            nome: this.travelForm.get('nome_estadia').value,
            endereco: this.travelForm.get('endereco_estadia').value,
            check_in: this.travelForm.get('checkin_date').value,
            check_out: this.travelForm.get('checkout_date').value
          }
      ]

      //setup travel values
      const travel = new Travel(this.travelForm.get('nome_viagem').value, this.travelForm.get('origem').value,
    this.travelForm.get('destino').value, this.travelForm?.get('transporte_ida_date').value,this.travelForm?.get('transporte_volta_date').value,
     transportes, hotel, this.user, 1000);

      //add travel
      this.travelService.addTravel(travel, this.userToken).subscribe(
        () => this.routes.navigate(['/Home'])
      );
  }

  setUser(user:any): void{
    this.user = user;
  }
}
