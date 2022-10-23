import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{

  token: string;

  constructor(private routes: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.token.subscribe(valor => this.token = valor);
  }
}
