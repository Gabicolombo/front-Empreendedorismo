import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService{
  private url = 'http://localhost:2828/user/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private tokenSource = new BehaviorSubject('');
  token = this.tokenSource.asObservable();

  constructor(private http: HttpClient) { }

  addUsuario(usuario: User) : Observable<any> {
    return this.http.post<User>(this.url+"register", usuario, this.httpOptions).pipe();
  }

  fazerLogin(email: string, senha: string) : Observable<any>{
    return this.http.post<User>(this.url+"login", {email, senha}, this.httpOptions).pipe();
  }

  //Metodo que atualiza o token do usuario (ele precisa ser atualizado quando entra e sai do sistema)
  armazenarDadosLogin(token: string) {
    this.tokenSource.next(token);
  }

  getUsuario(tokenUser: string) : Observable<User>{
    console.log('getUsuario: ', tokenUser);
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', tokenUser)
    //Requisicao GET que retorna os dados do usuario
    return this.http.get<User>(this.url+"myuser", this.httpOptions)
  }

}
