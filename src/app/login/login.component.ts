import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { UserService } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage!: string
  error: boolean = false;

  constructor(private userService: UserService,
    private routes: Router) { }

  ngOnInit(): void {

    this.loginForm= new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  login(){
    // buscando as informações do formulário
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;
    // chamando o serviço de login
    this.userService.fazerLogin(email, senha).subscribe(res => {
      this.userService.armazenarDadosLogin('BEARER ' + res.token);
      localStorage.setItem('token', 'Bearer '+res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuarioCadastrado));
      this.routes.navigate(['/Home']);
    },
    rst =>  {
      this.error = true;
      if(rst.error){
        this.errorMessage = rst.error.message;
      }
      else
        this.errorMessage = "Erro ao contatar o servidor"
    });

    this.errorMessage = '';
    this.error = false;
    this.loginForm.setValue({email: '', senha: ''});
  }

}
