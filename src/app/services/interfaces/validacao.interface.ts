import { IEmpresaResponse } from '../../models/empresa-response.interface';
import { Observable } from 'rxjs';

export interface IValidacaoService {
  validarCPF(cpf: string): boolean;
  validarIdade(dataNascimento: string): boolean;
  validarFormularioEmpresa(empresa: IEmpresaResponse): boolean;
  validarEmpresaExistente(nomeFantasia: string, modoEdicao: boolean): Observable<boolean>;
}
