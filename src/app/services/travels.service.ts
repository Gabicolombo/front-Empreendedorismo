import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Travel } from '../models/travel';

@Injectable()
export class TravelService{
  private url = 'http://localhost:2828/vacation/';
  status= '';
  errorMessage='';

  httpOptions = {
    headers: new HttpHeaders({
    })
  }

  constructor(private http: HttpClient) { }

  // adc viagens
  addTravel(travel: any, userToken: string) : Observable<any> {
     //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', userToken)
    console.log(travel);
    return this.http.post<Travel>(this.url+"register", travel, this.httpOptions).pipe();
  }

  // visualizar minhas viagens
  getTravels(token: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)

    return this.http.get(this.url+"mytravels", this.httpOptions)
  }

  // orçamento
  getBudget(token: string, idTravel: string): Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)

    let url = `${this.url}get-budget/${idTravel}`
    return this.http.get(url, this.httpOptions)
  }

  // deletar viagens
  deleteTravels(idViagem: string | null, token: string){
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization')
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token)

    let url = `${this.url}delete/${idViagem}`;

    return this.http.delete(url, this.httpOptions)
              .subscribe({
                next: data => {
                    this.status = 'Delete successful';
                },
                error: error => {
                    this.errorMessage = error.message;
                    console.error('There was an error!', error);
                }
            });
  }

}
