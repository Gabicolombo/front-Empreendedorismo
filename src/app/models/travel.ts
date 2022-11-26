import { User } from "./user";

export class Travel{

  constructor(nome: string, origem: string, destino: string, data_inicio: string, data_fim: string,
    transportes: Array<{id: number, tipo: string, descricao: string, data: string, caminho: string}>, 
    hotel: Array<{id: number, nome: string, endereco: string, check_in: string, check_out: string}>,
     proprietario: User, total_disponivel: Number) {
      this.nome = nome;
      this.origem = origem;
      this.destino = destino;
      this.dataInicio = data_inicio;
      this.dataFim = data_fim;
      this.transportes = transportes;
      this.hotel = hotel;
      this.proprietario = proprietario;
      this.total_disponivel = total_disponivel;
      }

  nome: string;
  origem: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  transportes: Array<{id: number, tipo: string, descricao: string,
    data: string, caminho: string}>;
  proprietario: User;
  participants: User[];
  checklist: Array<{
    status: boolean, descricao: string, categoria: string
  }>;
  gastos: Object;
  hotel: Array<{
    id: number, nome: string, endereco: string, check_in: string,
    check_out: string
  }>;
  roteiro: Array<{
    id: number,
    dia: number,
    hora: number,
    local: string,
    descricao: string
  }>;
  total_disponivel: Number;
  gasto_total: Number;
}
