import { User } from "./user";

export class Travel{
  nome: string;
  origem: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  transportes: Array<{tipo: string, descricao: string,
    horario: string, caminho: string}>;
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
