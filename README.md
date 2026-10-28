# play-senac

Frontend de um projeto em equipe para agendamento e gerenciamento de quadras esportivas do Centro Universitário Senac. A interface organiza consulta e reserva de quadras, formulários, diálogos e operações administrativas integradas a uma API Spring Boot.

## Demonstração e imagens

[Case e demonstração no portfólio](https://guiler.vercel.app) · [API do projeto](https://github.com/GuilhermeSerafim/play-senac-api). A demonstração do case usa dados sintéticos e operações locais; não equivale ao serviço integrado original.

## Minha contribuição e autoria

Minha contribuição concentrou-se no frontend Angular: interfaces de reserva e administração, formulários, diálogos, responsividade, integração HTTP e atualização das listas com RxJS. As regras de conflito e a persistência ficam na API desenvolvida pela equipe.

## Arquitetura e implementação

Componentes standalone utilizam Angular Material e RxJS. Os serviços adaptam os DTOs da API para os modelos da interface. A tela administrativa combina quadras e reservas e pagina a coleção recebida **no navegador**.

Veja o [serviço de reservas](src/app/services/reserva.service.ts) e o [componente administrativo](src/app/components/reservas-adm/reservas-adm.ts).

## Instalação e configuração

Requer Node.js 22 e npm 10 ou superior. Configure `apiUrl` em `src/environments/environment.development.ts` com a URL da API local antes de iniciar o frontend. A API precisa estar em execução para autenticação e operações persistidas.

Os blocos abaixo partem da raiz do repositório. Use as versões e variáveis indicadas; não coloque credenciais no código ou no README.

```text
npm ci
npm start
```

Para gerar os arquivos de produção, execute `npm run build` em outro terminal. Verifique também o ambiente Angular de produção antes de publicar.

## Testes e verificações

Os comandos abaixo documentam a suíte existente; não representam uma execução nova nem um resultado de aprovação.

```text
npm test
```

## Limites atuais

- A suíte inclui testes de criação; o teste raiz ainda precisa ser alinhado ao template atual.
- As rotas não aplicam guards. A autorização das operações depende do backend.
- O interceptor de token precisa de revisão de escopo de origem antes de adicionar chamadas externas.

<details>
<summary>Referência de uso e documentação complementar</summary>

## Acessos e configuração local

O servidor de desenvolvimento atende em `http://localhost:4200/`.

Para usar a API local do projeto, configure `apiUrl` como `http://localhost:8080` em `src/environments/environment.development.ts`. O ambiente de produção fica em `src/environments/environment.ts`.

O endereço da API hospedada documentado pelo projeto é `https://play-senac-api.onrender.com`. O link identifica a configuração existente; não garante disponibilidade do serviço.

## Rotas principais

| Rota | Descricao |
| --- | --- |
| `/home` | Landing page com apresentacao do projeto e selecao de quadras |
| `/entre` | Tela de login |
| `/cadastro` | Tela de cadastro de usuario |
| `/reservas` | Area do usuario para criar e acompanhar reservas |
| `/dashboard` | Painel administrativo |

## Links do projeto

- [Aplicação integrada original](https://play-senac.vercel.app/)
- [API Spring Boot](https://github.com/GuilhermeSerafim/play-senac-api)
- [Protótipo no Figma](https://www.figma.com/proto/k0ublZXSnKWTw9W9YGRCF7/Play-Senac?node-id=74-66&t=imzkF1T5s64SmrGi-1)

A aplicação integrada original é distinta da demonstração sintética indicada no case.

</details>

## Licença

Consulte [MIT-License.txt](MIT-License.txt).
