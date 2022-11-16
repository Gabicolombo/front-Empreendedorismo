export class CheckList{

  constructor(viagem: string, status: boolean,
    descricao: string, categoria: string, usuario: string){
      // this.usuario: usuario;
      this.viagem = viagem;
      this.status = status;
      this.descricao = descricao;
      this.categoria = categoria;
  }
  viagem: string;
  status: boolean;
  descricao: string;
  categoria: string;
}
