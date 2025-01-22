import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IEmpresa } from '../../models/empresa.interface';
import { IEmpresaResponse } from '../../models/empresa-response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  empresas: IEmpresa[] = [];
  empresaSelecionada: IEmpresa | null = null;
  entidadesRegistro: any = {};

  constructor(private empresaService: EmpresaService, private router: Router) {}

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe((response: IEmpresaResponse[]) => {
      this.empresas = response.map(empresa => this.mapearEmpresa(empresa));
      if (this.empresas.length > 0) {
        this.empresaSelecionada = this.empresas[0];
      }
    });

    this.empresaService.getEntidadesRegistro().subscribe((data) => {
      this.entidadesRegistro = Object.fromEntries(data.map((e: any) => [e.key, e.value]));
    });
  }

  private mapearEmpresa(response: IEmpresaResponse): IEmpresa {
    return {
      id: response.id,
      responsavel: response.solicitante.ds_responsavel,
      cpf: response.solicitante.nu_cpf,
      nascimento: response.solicitante.date_nascimento,
      nomeFantasia: response.empresa.ds_nome_fantasia,
      entidadeRegistro: response.empresa.co_entidade_registro,
      endereco: {
        cep: response.empresa.endereco.co_cep,
        logradouro: response.empresa.endereco.ds_logradouro,
        numero: response.empresa.endereco.co_numero,
        complemento: response.empresa.endereco.ds_complemento || '',
        bairro: response.empresa.endereco.ds_bairro,
        municipio: response.empresa.endereco.ds_municipio,
        uf: response.empresa.endereco.co_uf
      }
    };
  }

  visualizarEmpresa(empresa: IEmpresa): void {
    this.empresaSelecionada = empresa;
  }

  abrirFormulario(): void {
    this.router.navigate(['/solicitacao']);
  }

  editarEmpresa(empresa: IEmpresa): void {
    this.router.navigate(['/solicitacao/editar', empresa.id]);
  }
}
