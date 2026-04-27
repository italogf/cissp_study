# CISSP Learning SaaS

Plataforma de estudo para CISSP com foco em trilhas curtas, progressão visível e suporte a múltiplos idiomas.

Este guia foi escrito para quem quer subir o projeto pela primeira vez, mesmo sem muita familiaridade com Node.js, PostgreSQL ou Prisma.

## 1. O que você precisa instalar

Antes de começar, instale estes itens:

- Node.js 22 LTS recomendado
- Git
- PostgreSQL

### Instalar o Node.js

Baixe a versão LTS em:

https://nodejs.org/

No Windows, se preferir instalar pelo terminal, você também pode usar o `winget` no PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
```

Depois de instalar, confirme no terminal:

```bash
node -v
npm -v
```

Se os comandos responderem com versões, o Node foi instalado corretamente.

### Instalar o pnpm

Este projeto usa `pnpm` como gerenciador de pacotes.

Tente primeiro com o Corepack, que já vem com versões recentes do Node:

```bash
corepack enable
corepack prepare pnpm@10.8.1 --activate
pnpm -v
```

Se isso não funcionar, instale globalmente:

```bash
npm install -g pnpm@10.8.1
pnpm -v
```

### Instalar o PostgreSQL

Baixe em:

https://www.postgresql.org/download/

Durante a instalação, defina e anote:

- usuário do banco
- senha do banco
- porta do PostgreSQL, normalmente `5432`

## 2. Clonar o projeto

Se você ainda não baixou o projeto:

```bash
git clone https://github.com/italogf/cissp_study.git
cd cissp_study
```

No PowerShell, você também pode entrar na pasta assim:

```powershell
Set-Location .\cissp_study
```

## 3. Instalar as dependências

Na raiz do projeto, rode:

```bash
pnpm install
```

Esse comando baixa todas as bibliotecas usadas pela aplicação.

## 4. Criar e configurar o arquivo `.env`

Este projeto usa um arquivo `.env` com as variáveis locais de ambiente.

Crie o arquivo a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Se você estiver usando o Prompt de Comando do Windows (`cmd`), pode usar:

```bat
copy .env.example .env
```

No macOS ou Linux:

```bash
cp .env.example .env
```

Depois edite o arquivo `.env` e ajuste os valores.

Exemplo:

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cissp_focus_studio?schema=public"
AUTH_SECRET="coloque-aqui-uma-chave-longa-com-pelo-menos-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
```

### O que significa cada variável

`DATABASE_URL`

String de conexão com o PostgreSQL.

Formato:

```dotenv
postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public
```

Exemplo real:

```dotenv
postgresql://postgres:minhaSenha@localhost:5432/cissp_focus_studio?schema=public
```

`AUTH_SECRET`

Chave usada pela autenticação da aplicação. Deve ter pelo menos 32 caracteres.

Você pode gerar uma chave aleatória com Node:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`NEXTAUTH_URL`

URL local usada pela autenticação. Em ambiente local normalmente fica:

```dotenv
NEXTAUTH_URL="http://localhost:3000"
```

Se você subir a aplicação em outra porta, altere essa URL também.

### Variável opcional

Se quiser usar a explicação com IA na rota de estudo, adicione também:

```dotenv
OPENAI_API_KEY="sua-chave-aqui"
```

Sem essa variável, o projeto sobe normalmente, mas a funcionalidade de explicação por IA responde como não configurada.

## 5. Criar o banco de dados

Você precisa criar o banco antes de aplicar as migrations.

Se estiver usando o usuário `postgres`, um exemplo é:

```sql
CREATE DATABASE cissp_focus_studio;
```

Você pode criar esse banco usando:

- pgAdmin
- DBeaver
- terminal `psql`

### Criando pelo pgAdmin no Windows

Se você instalou o PostgreSQL com o pgAdmin, este costuma ser o caminho mais fácil:

1. Abra o pgAdmin.
2. Conecte no seu servidor local PostgreSQL.
3. No menu lateral, expanda `Servers`.
4. Expanda o servidor local.
5. Clique com o botão direito em `Databases`.
6. Escolha `Create` e depois `Database...`.
7. Em `Database`, informe `cissp_focus_studio`.
8. Salve.

Depois disso, sua `DATABASE_URL` deve apontar para esse banco.

Exemplo com `psql`:

```bash
psql -U postgres
```

Depois, no prompt do PostgreSQL:

```sql
CREATE DATABASE cissp_focus_studio;
```

Se quiser, você também pode executar esse mesmo SQL no `Query Tool` do pgAdmin.

## 6. Gerar o client do Prisma

Depois que o `.env` estiver configurado:

```bash
pnpm db:generate
```

Esse comando gera o Prisma Client usado pela aplicação para conversar com o banco.

## 7. Aplicar as migrations

Para ambiente local de desenvolvimento, use:

```bash
pnpm db:migrate:dev
```

Esse comando:

- aplica as migrations existentes
- cria ou atualiza a estrutura do banco
- mantém o histórico das migrations

Se no futuro você quiser apenas aplicar migrations já existentes em um ambiente mais controlado, use:

```bash
pnpm db:migrate:deploy
```

Resumo prático:

- `pnpm db:migrate:dev`: uso local no desenvolvimento
- `pnpm db:migrate:deploy`: uso mais comum em deploy ou servidor

## 8. Popular o banco com dados iniciais

Depois das migrations, rode o seed:

```bash
pnpm db:seed
```

Esse comando insere os dados iniciais da plataforma, incluindo conteúdo base do CISSP em inglês e português.

## 9. Subir o projeto localmente

Agora inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra no navegador:

http://localhost:3000

Algumas rotas úteis:

- `http://localhost:3000/pt-BR`
- `http://localhost:3000/pt-BR/sign-up`
- `http://localhost:3000/pt-BR/sign-in`
- `http://localhost:3000/pt-BR/study`

## 10. Comandos mais usados

Instalar dependências:

```bash
pnpm install
```

Rodar em desenvolvimento:

```bash
pnpm dev
```

Gerar Prisma Client:

```bash
pnpm db:generate
```

Aplicar migrations no banco local:

```bash
pnpm db:migrate:dev
```

Aplicar migrations em ambiente de deploy:

```bash
pnpm db:migrate:deploy
```

Popular o banco com dados iniciais:

```bash
pnpm db:seed
```

Rodar lint:

```bash
pnpm lint
```

Rodar typecheck:

```bash
pnpm typecheck
```

Rodar testes:

```bash
pnpm test
```

Rodar checagem completa:

```bash
pnpm check
```

## 11. Problemas comuns

### Erro de conexão com o banco

Revise:

- se o PostgreSQL está ligado
- se o banco foi criado
- se usuário e senha da `DATABASE_URL` estão corretos
- se a porta está certa, normalmente `5432`

### Erro dizendo que `AUTH_SECRET` é inválido

A aplicação exige uma chave com pelo menos 32 caracteres.

### Porta diferente de `3000`

Se você subir em outra porta, lembre de atualizar também o `NEXTAUTH_URL`.

Exemplo:

```dotenv
NEXTAUTH_URL="http://localhost:3001"
```

### A funcionalidade de IA não funciona

Verifique se `OPENAI_API_KEY` foi configurada no `.env`.

## 12. Fluxo rápido para a primeira subida

Se você já instalou Node, pnpm e PostgreSQL, o fluxo básico é:

```bash
git clone https://github.com/italogf/cissp_study.git
cd cissp_study
pnpm install
copy .env.example .env
pnpm db:generate
pnpm db:migrate:dev
pnpm db:seed
pnpm dev
```

Depois, abra:

http://localhost:3000/pt-BR

### Fluxo rápido no Windows com PowerShell

Se você estiver no Windows, este é um roteiro direto:

```powershell
git clone https://github.com/italogf/cissp_study.git
Set-Location .\cissp_study
pnpm install
Copy-Item .env.example .env
pnpm db:generate
pnpm db:migrate:dev
pnpm db:seed
pnpm dev
```

Se o banco ainda não existir, crie `cissp_focus_studio` no pgAdmin antes de rodar `pnpm db:migrate:dev`.