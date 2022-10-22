import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-Empreendedorismo';

  constructor(private userService: UserService){}

  ngOnInit(): void {
      let token = localStorage.getItem('token');
      this.userService.armazenarDadosLogin(token != null ? token: '');
  }
}
