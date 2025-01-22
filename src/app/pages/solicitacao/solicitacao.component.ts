import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ValidacaoService } from '../../services/validacao.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { IEmpresaResponse } from '../../models/empresa-response.interface';

interface EntidadeRegistro {
  key: number;
  value: string;
}

@Component({
  selector: 'app-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    RouterModule
  ],
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {
  @ViewChild('successTemplate') successTemplate!: TemplateRef<any>;
  estados: any[] = [];
  entidadesRegistro: EntidadeRegistro[] = [];
  modoEdicao = false;
  empresaId: string | null = null;
  modalRef?: BsModalRef;
  mensagemSucesso: string = '';

  novaEmpresa: IEmpresaResponse = {
    id: '',
    solicitante: {
      ds_responsavel: '',
      nu_cpf: '',
      date_nascimento: ''
    },
    empresa: {
      ds_nome_fantasia: '',
      co_entidade_registro: 0,
      endereco: {
        co_cep: '',
        ds_logradouro: '',
        co_numero: '',
        ds_complemento: null,
        ds_bairro: '',
        ds_municipio: '',
        co_uf: ''
      }
    }
  };

  constructor(
    private empresaService: EmpresaService,
    private validacaoService: ValidacaoService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modoEdicao = true;
        this.empresaId = params['id'];
        this.carregarEmpresa(params['id']);
      }
    });

    this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .subscribe(data => {
        this.estados = data;
      });

    this.empresaService.getEntidadesRegistro().subscribe(data => {
      this.entidadesRegistro = data;
    });
  }

  carregarEmpresa(id: string): void {
    this.empresaService.getEmpresaById(id).subscribe(response => {
      this.novaEmpresa = {
        id: response.id,
        solicitante: {
          ds_responsavel: response.solicitante.ds_responsavel,
          nu_cpf: response.solicitante.nu_cpf,
          date_nascimento: response.solicitante.date_nascimento
        },
        empresa: {
          ds_nome_fantasia: response.empresa.ds_nome_fantasia,
          co_entidade_registro: response.empresa.co_entidade_registro,
          endereco: {
            co_cep: response.empresa.endereco.co_cep,
            ds_logradouro: response.empresa.endereco.ds_logradouro,
            co_numero: response.empresa.endereco.co_numero,
            ds_complemento: response.empresa.endereco.ds_complemento,
            ds_bairro: response.empresa.endereco.ds_bairro,
            ds_municipio: response.empresa.endereco.ds_municipio,
            co_uf: response.empresa.endereco.co_uf
          }
        }
      };
    });
  }

  onSubmit(): void {
    if (this.validacaoService.validarFormularioEmpresa(this.novaEmpresa)) {
      const nomeFantasia = this.novaEmpresa.empresa.ds_nome_fantasia;

      this.validacaoService.validarEmpresaExistente(nomeFantasia, this.modoEdicao)
        .subscribe(valido => {
          if (valido) {
            if (this.modoEdicao && this.empresaId) {
              this.empresaService.updateEmpresa(this.empresaId, this.novaEmpresa).subscribe(() => {
                this.openModal(this.successTemplate, "Empresa atualizada com sucesso!");
              });
            } else {
              this.empresaService.addEmpresa(this.novaEmpresa).subscribe((empresaCriada) => {
                this.novaEmpresa.id = empresaCriada.id;
                this.openModal(this.successTemplate, "Empresa cadastrada com sucesso!");
              });
            }
          }
        });
    }
  }

  openModal(template: TemplateRef<any>, message: string) {
    this.mensagemSucesso = message;
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false
    });
  }

  fecharModal() {
    this.modalRef?.hide();
    this.router.navigate(['/']);
  }
}
