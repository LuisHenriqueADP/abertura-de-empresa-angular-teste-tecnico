# Sistema de Abertura de Empresas

## Descrição do Projeto

Este é um sistema desenvolvido em Angular para gerenciar solicitações de abertura de empresas. O sistema permite:

- Cadastrar novas solicitações de abertura de empresa
- Visualizar lista de empresas cadastradas
- Editar informações de empresas existentes
- Validar dados do formulário (CPF, idade mínima, campos obrigatórios)
- Verificar duplicidade de nome fantasia

### Tecnologias Utilizadas

- Angular 19.1.0
- TypeScript
- Bootstrap 5
- NGX-Bootstrap
- JSON Server (para mock da API)

## Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM (Node Package Manager)
- Angular CLI (versão 19.1.3)

## Instalação

1. Clone o repositório:
git clone [url-do-repositorio]

2. Instale as dependências:
npm install


## Executando o Projeto

1. Primeiro, inicie o servidor mock (JSON Server):
npm run mock
 ou
json-server --watch mocks/db.json --port 3000


2. Em outro terminal, inicie a aplicação Angular:
npm start
ou
ng serve


3. Acesse a aplicação em seu navegador:
http://localhost:4200


## Estrutura do Projeto

- `src/app/pages/`: Componentes principais das páginas
- `src/app/services/`: Serviços para lógica de negócios
- `src/app/models/`: Interfaces e modelos de dados
- `mocks/`: Arquivos de mock para o JSON Server

## Funcionalidades Implementadas

### Validações
- CPF válido
- Idade mínima de 18 anos
- Campos obrigatórios
- Nome fantasia único

### Interface Responsiva
- Layout adaptável para diferentes tamanhos de tela
- Design moderno com Bootstrap
- Feedback visual para ações do usuário

### Arquitetura
- Componentes standalone
- Serviços com interfaces bem definidas
- Roteamento modular
- Tipagem forte com TypeScript

## Executando Testes

Para executar os testes unitários:
npm test


## Observações

- O servidor mock (JSON Server) deve estar rodando na porta 3000
- A aplicação Angular roda na porta 4200
- Certifique-se de que ambas as portas estejam disponíveis

## Melhorias Futuras

- Implementar mais testes unitários
- Adicionar validação de CEP
- Implementar autenticação
- Adicionar mais filtros na listagem
- Melhorar feedback de erros
