# Play Senac

Frontend do Play Senac, uma aplicacao web para reserva e gestao de quadras esportivas do Senac.

[Aplicacao online](https://play-senac.vercel.app/) | [API Spring Boot](https://github.com/GuilhermeSerafim/play-senac-api) | [Prototipo no Figma](https://www.figma.com/proto/k0ublZXSnKWTw9W9YGRCF7/Play-Senac?node-id=74-66&t=imzkF1T5s64SmrGi-1)

## Visao geral

O projeto foi construido como uma SPA em Angular e cobre dois fluxos principais:

- experiencia do usuario final para consultar quadras e fazer reservas;
- experiencia administrativa para gerenciar quadras, reservas e bloqueios.

A aplicacao consome uma API REST em Spring Boot e usa autenticacao com token para proteger as operacoes do usuario autenticado.

## Funcionalidades atuais

- listagem de quadras com imagem, dias disponiveis e indicacao de disponibilidade;
- cadastro de usuario e login;
- criacao de reservas com selecao de quadra, data, horario e convidados;
- visualizacao das proximas reservas do usuario;
- cancelamento de reservas;
- dashboard administrativo com abas para quadras, reservas e bloqueios;
- criacao, edicao e remocao de quadras;
- suporte a bloqueio e desbloqueio de quadras;
- envio automatico do token JWT nas requisicoes autenticadas.

## Stack atual

- Angular 20
- Angular Material
- RxJS
- SCSS
- TypeScript
- Spring Boot (backend)
- Vercel (deploy do frontend)
- Render (API em producao)

## Rotas principais

| Rota | Descricao |
| --- | --- |
| `/home` | Landing page com apresentacao do projeto e selecao de quadras |
| `/entre` | Tela de login |
| `/cadastro` | Tela de cadastro de usuario |
| `/reservas` | Area do usuario para criar e acompanhar reservas |
| `/dashboard` | Painel administrativo |

## Como rodar o projeto

### Requisitos

- Node.js 22 ou outra versao compativel com Angular 20
- npm 10+

### Instalar dependencias

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm start
```

O projeto sera servido em `http://localhost:4200/`.

### Gerar build de producao

```bash
npm run build
```

### Executar testes

```bash
npm test
```

## Scripts disponiveis

| Comando | O que faz |
| --- | --- |
| `npm start` | sobe o servidor de desenvolvimento |
| `npm run build` | gera a build de producao |
| `npm run watch` | recompila a aplicacao em modo watch |
| `npm test` | executa os testes com Karma |

## Ambiente e integracao com a API

Os arquivos de ambiente ficam em `src/environments/`.

Atualmente, tanto o ambiente de desenvolvimento quanto o de producao apontam para a API hospedada em:

```text
https://play-senac-api.onrender.com
```

Se voce quiser rodar com uma API local, ajuste o valor de `apiUrl` em `src/environments/environment.development.ts`.

## Estrutura resumida

```text
src/
  app/
    components/   componentes reutilizaveis e dialogs
    pages/        paginas principais da aplicacao
    services/     integracao com a API e estado compartilhado
    interfaces/   contratos de dados
    interceptor/  envio do token nas requisicoes HTTP
  environments/   configuracao por ambiente
  styles/         estilos globais e variaveis SCSS
public/
  images/         imagens da interface
  icons/          icones usados na aplicacao
```

## Observacoes

- O acesso ao dashboard depende do perfil retornado pela API no login.
- O frontend usa componentes standalone do Angular.
- Algumas telas exibem estado de carregamento e mensagens de erro para operacoes como login, cadastro e reserva.

## Licenca

Este projeto esta sob a licenca MIT. Consulte `MIT-License.txt` para mais detalhes.
