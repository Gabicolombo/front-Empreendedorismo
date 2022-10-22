import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Travel } from '../models/travel';

@Injectable()
export class TravelService{
  private url = 'http://localhost:2828/vacation/';

  httpOptions = {
    headers: new HttpHeaders({
    })
  }

  constructor(private http: HttpClient) { }

  // adc viagens

  // visualizar minhas viagens
  getTravels(token: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)

    return this.http.get(this.url+"mytravels", this.httpOptions)
  }
}
