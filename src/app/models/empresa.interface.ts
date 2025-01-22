import { IEndereco } from './endereco.interface';

export interface IEmpresa {
  id: string;
  responsavel: string;
  cpf: string;
  nascimento: string;
  nomeFantasia: string;
  entidadeRegistro: number;
  endereco: IEndereco;
}
