import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmpresaRepository } from './interfaces/empresa-repository.interface';
import { IEmpresaResponse } from '../models/empresa-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService implements IEmpresaRepository {
  private apiUrl = 'http://localhost:3000/empresas';
  private entidadeRegistroUrl = 'http://localhost:3000/entidade-registro'; // URL correta

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<IEmpresaResponse[]> {
    return this.http.get<IEmpresaResponse[]>(this.apiUrl);
  }

  getEmpresaById(id: string): Observable<IEmpresaResponse> {
    return this.http.get<IEmpresaResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        id: response.id.toString() // Garante que o ID seja sempre string
      }))
    );
  }

  addEmpresa(empresa: IEmpresaResponse): Observable<IEmpresaResponse> {
    const novaEmpresa = {
      ...empresa,
      id: Date.now().toString() // Gera um ID único baseado no timestamp
    };
    return this.http.post<IEmpresaResponse>(this.apiUrl, novaEmpresa);
  }

  updateEmpresa(id: string, empresa: IEmpresaResponse): Observable<IEmpresaResponse> {
    return this.http.put<IEmpresaResponse>(`${this.apiUrl}/${id}`, empresa);
  }

  getEntidadesRegistro(): Observable<any[]> {
    return this.http.get<any[]>(this.entidadeRegistroUrl);
  }

  checkEmpresaExists(nomeFantasia: string): Observable<boolean> {
    return this.http.get<IEmpresaResponse[]>(this.apiUrl).pipe(
      map(empresas => {
        return empresas.some(empresa =>
          empresa.empresa.ds_nome_fantasia.toLowerCase() === nomeFantasia.toLowerCase()
        );
      })
    );
  }
}
