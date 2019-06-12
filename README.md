# Maxmilhas Teste

## Observações

Para o correto funcionamento da aplicação é necessário que se tenha uma instância do MongoDB sendo
executada localmente

Nome do banco de dados: CPFChecker

## GitHub

`<link>`: https://github.com/CarlosHSilvaVieira/blacklist

## Inicialização

Execute o comando abaixo para instalar as dependencias do sistema

`$ npm install`

## Execução em ambiente de desenvolvimento

`$ npm run dev`

## Execução em ambiente de produção

`$ npm run prod`

## Estruturação do projeto

Esta seção define a estrutura de pastas e arquivos do projeto

- frontend
- src
    - controllers
        - blacklist
    - models
        - blacklist
    - routes
        - blacklist
        - status
    - utils
    - app.ts
    - server.ts

    ### app.ts

    Neste arquivo é criado o servidor express, realizada as configurações para
    que o servidor aceite receber application/json. Também é realizada a conexão com banco de dados 

    ### server.ts

    Neste arquivo o servidor criado no arquipo app.ts é colocado em execução na porta 3000

    ### controllers

    Nessa pasta ficam os arquivos que executam as regras de negócio da aplicação

    ### models

    Nessa pasta ficam os arquivos que criam e obtem acesso a uma collection do banaco de dados

    ### routes

    Nessa pasta ficam os arquivos que criam as rotas do serviço

    ### utils

    Nessa pasta ficam os arquivos que exportam as variaveis globais do sistema

    ### frontend

    Nessa pasta fica a página html para utilização do serviço via interface web

## Principais Dependencias

### express
O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel.

### mongoose
Mongoose fronece uma solução para modelagem e consultas utilizando mongoDB em NodeJS

## API

### Consulta
    
`<link>`: http://localhost:3000/blacklist/:cpf

Método: GET

Nessa URL é possivel verificar se o cpf fornecido está ou não dentro da blacklist

Exemplo: http://localhost:3000/blacklist/12345678901

retorno: 

    {
        "status": Resultado da consulta, pode ser "BLOCK" caso esteja bloqueado ou "FREE" caso esteja livre,
        "error": Retorna o erro caso ele exista, caso não tenha erro possuirá o valor null
    }

### Block CPF

`<link>`: http://localhost:3000/blacklist/block

Método: POST

Nessa URL é possivel inserir o cpf fornecido dentro da blacklist

Obs: Não se esqueça de inserir no header da requisição o content-type

    Content-Type: application/json

Exemplo Body:

    {
        "cpf": "12345678971"
    }

retorno: 

    {
        "blocked": Resultado da inserção, pode ser true caso realizada com sucesso ou false caso tenha ocorrido algum erro,
        "error": Retorna o erro caso ele exista, caso não tenha erro possuirá o valor null
    }


### Free CPF

`<link>`: http://localhost:3000/blacklist/free/:cpf

Método: GET

Nessa URL é possivel remover o cpf fornecido da blacklist

Exemplo: http://localhost:3000/blacklist/free/12345678901

retorno: 

    {
        "free": Resultado da remoção da blacklist, pode ser true caso realizada com sucesso ou false caso tenha ocorrido algum erro,
        "error": Retorna o erro caso ele exista, caso não tenha erro possuirá o valor null
    }
