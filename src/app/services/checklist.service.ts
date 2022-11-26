import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckList } from '../models/checklist';

@Injectable()
export class CheckListService{
  private url = 'http://localhost:2828/checklist';
  status = '';
  errorMessage = '';

  httpOptions = {
    headers: new HttpHeaders({})
  }

  constructor(private http: HttpClient){}

  // para pegar o checklist
  getChecklist(categoria:  string | null , token: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token);

    let url = ``;
    if(categoria != null) url = `${this.url}/check?categoria=${categoria}`;
    else url = `${this.url}/check?`;

    return this.http.get(url, this.httpOptions);
  }

  // para adc o checklist
  addChecklist(checklist: CheckList, userToken: string) : Observable<any> {
    //Atualizando o header da requisicao para enviar o token
   if(this.httpOptions.headers.has('Authorization'))
     this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
   if(!this.httpOptions.headers.has('Authorization'))
     this.httpOptions.headers = this.httpOptions.headers.append('Authorization', userToken);

   return this.http.post<CheckList>(this.url, checklist, this.httpOptions).pipe();
 }

  // para atualizar o checklist
  updateChecklist(idChecklist: string | null, token: string, body: object) {

    if(this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    if(!this.httpOptions.headers.has('Authorization'))
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', token);

    let url = `${this.url}/${idChecklist}`;

    return this.http.put<CheckList>(url, body, this.httpOptions).subscribe(response => console.log(response))
  }
}
