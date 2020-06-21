# Delivery Much Tech Challenge

Solução apresentada para o [Delivery Much Tech Challenge](challenge.md).

## Requisitos

- [Docker](docker.com) 19.03

## Configurações

1. Copie o arquivo `.env.example` e renomeie para `.env`
2. Edite no arquivo `.env` a chave de API do Giphy `GIPHY_KEY`

Observação: para obter uma chave de API do Giphy [visite o dashboard](https://developers.giphy.com/dashboard/) e crie um app (ou utilize um existente).

## Execução

1. No diretório raiz do projeto, construa a imagem da aplicação:

```
$ docker build -t deliverymuch-test .
```

2. Com a imagem construída, rode o container da aplicação:

```
$ docker run -p 3000:3000 -d --restart unless-stopped deliverymuch-test
```

## Testes

Faça um request para http://localhost:3000/recipes?i=onion,tomato

Ou utilize abra o arquivo `test.html` no navegador.

## Autor

[Willy Stadnick](willy.stadnick@gmail.com)
