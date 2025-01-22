export interface IEmpresaResponse {
  id: string;
  solicitante: {
    ds_responsavel: string;
    nu_cpf: string;
    date_nascimento: string;
  };
  empresa: {
    ds_nome_fantasia: string;
    co_entidade_registro: number;
    endereco: {
      co_cep: string;
      ds_logradouro: string;
      co_numero: string;
      ds_complemento: string | null;
      ds_bairro: string;
      ds_municipio: string;
      co_uf: string;
    };
  };
}
