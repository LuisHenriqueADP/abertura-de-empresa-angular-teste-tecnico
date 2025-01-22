import { Observable } from 'rxjs';
import { IEmpresaResponse } from '../../models/empresa-response.interface';

export interface IEmpresaRepository {
  getEmpresas(): Observable<IEmpresaResponse[]>;
  getEmpresaById(id: string): Observable<IEmpresaResponse>;
  addEmpresa(empresa: IEmpresaResponse): Observable<IEmpresaResponse>;
  updateEmpresa(id: string, empresa: IEmpresaResponse): Observable<IEmpresaResponse>;
  checkEmpresaExists(nomeFantasia: string): Observable<boolean>;
  getEntidadesRegistro(): Observable<any[]>;
}
