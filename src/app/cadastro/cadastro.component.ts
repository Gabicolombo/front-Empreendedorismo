import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  errorMessage!: string;
  cadastro: any;

  constructor(private router:Router, private route:ActivatedRoute, private user:UserService) { 

  }

  ngOnInit(): void {

    this.cadastro = new FormGroup({
      nome: new FormControl(''),
      nome_usuario: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  NovoUsuario() {
    const nome = this.cadastro.get('nome').value;
    const nome_usuario = this.cadastro.get('nome_usuario').value;
    const email = this.cadastro.get('email').value;
    const senha = this.cadastro.get('senha').value;
    
    this.user.addUsuario(this.cadastro.value).subscribe(res => { 
      this.router.navigate(["/Login"]);
    }, err=>{
      this.errorMessage = err.error.message;
    });

  }

}