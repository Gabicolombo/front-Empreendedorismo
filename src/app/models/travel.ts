import { User } from "./user";

export class Travel{

  constructor(nome: string, origem: string, destino: string,
    transportes: Array<{tipo: string, descricao: string, data: string, caminho: string}>, 
    hotel: Array<{ nome: string, endereco: string, check_in: string, check_out: string}>,
     proprietario: User, participants: User[],) {
      this.nome = nome;
      this.origem = origem;
      this.destino = destino;
      this.transportes = transportes;
      this.hotel = hotel;
      this.proprietario = proprietario;
      this.participants = participants;
      }

  nome: string;
  origem: string;
  destino: string;
  transportes: Array<{tipo: string, descricao: string,
    data: string, caminho: string}>;
  proprietario: User;
  participants: User[];
  checklist: Array<{
    status: boolean, descricao: string, categoria: string
  }>;
  gastos: Object;
  hotel: Array<{
    nome: string, endereco: string, check_in: string,
    check_out: string
  }>;
  orcamento_total: number;
  roteiro: Array<{
    dia: number,
    hora: number,
    local: string,
    descricao: string
  }>;
  total_disponivel: Number;
  gasto_total: Number;
}
