import { Travel } from "./travel";
import { CheckList } from "./checklist";
export class User{
  nome: string;
  nome_usuario: string;
  email: string;
  senha: string;
  viagens: Travel[];
  checklist: CheckList[];
}
