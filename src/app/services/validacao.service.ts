import { Injectable } from '@angular/core';
import { IValidacaoService } from './interfaces/validacao.interface';
import { IEmpresaResponse } from '../models/empresa-response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService implements IValidacaoService {
  constructor(private empresaService: EmpresaService) {}

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  validarIdade(dataNascimento: string): boolean {
    if (!dataNascimento) return false;

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade >= 18;
  }

  validarFormularioEmpresa(empresa: IEmpresaResponse): boolean {
    const { solicitante, empresa: dadosEmpresa } = empresa;
    const { endereco } = dadosEmpresa;

    if (!this.validarCPF(solicitante.nu_cpf)) {
      alert("Por favor, insira um CPF válido!");
      return false;
    }

    if (!this.validarIdade(solicitante.date_nascimento)) {
      alert("É necessário ter mais de 18 anos para cadastrar uma empresa!");
      return false;
    }

    return solicitante.ds_responsavel?.trim() !== '' &&
           solicitante.date_nascimento !== null &&
           dadosEmpresa.ds_nome_fantasia?.trim() !== '' &&
           dadosEmpresa.co_entidade_registro !== null &&
           endereco.co_cep?.toString().trim() !== '' &&
           endereco.ds_logradouro?.trim() !== '' &&
           endereco.ds_bairro?.trim() !== '' &&
           endereco.ds_municipio?.trim() !== '' &&
           endereco.co_uf?.trim() !== '';
  }

  validarEmpresaExistente(nomeFantasia: string, modoEdicao: boolean): Observable<boolean> {
    return this.empresaService.checkEmpresaExists(nomeFantasia).pipe(
      map(exists => {
        if (exists && !modoEdicao) {
          alert("Já existe uma empresa cadastrada com este nome fantasia!");
          return false;
        }
        return true;
      })
    );
  }
}
