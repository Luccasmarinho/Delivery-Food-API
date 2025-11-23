# Delivery API

API REST para um sistema de delivery, com funcionalidades para clientes, produtos e pedidos.

### Tecnologias utilizadas

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white) 
![Typescript](https://img.shields.io/badge/Typescript-2F74C0?style=for-the-badge&logo=typescript&logoColor=white) 
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)


### Features

```bash
- USUÁRIOS
Registrar usuário
Listar todos os usuários
Buscar usuário por id
Esqueceu sua senha
Logar usuário
Redefinir sua senha
Refresh token
Deslogar usuário
Buscar pedido por id(usuário)

- PRODUTOS
Criar produtos
Listar todos os produtos

- PEDIDOS
Criar pedido
Buscar pedido por id(pedido)
Atulizar status do pedido
```

### Instalação

```bash
$ git clone https://github.com/Luccasmarinho/Delivery-Food-API.git

$ npm install
```

### Rodando a aplicação

```bash
$ npx prisma migrate dev

$ npx prisma studio

$ npm run dev
```

### Rotas da API

| Método | Endpoint                   | Responsabilidade                                   |
| ------ | -------------------------- | -------------------------------------------------- |
| POST   | /auth/register             | Registrar usuário                                  |
| GET    | /users                     | Listar todos os usuários                           |
| GET    | /users/:id                 | Buscar usuário por id                              |
| POST   | /auth/forgot-password      | Enviar email com token para redefinição de senha   |
| POST   | /auth/reset-password/:token| Redefinir senha através de token enviado por email |
| POST   | /auth/login                | Logar usuário                                      |
| POST   | /auth/refresh-token        | Refresh token                                      |
| POST   | /auth/logout               | Deslogar usuário                                   |
| GET    | /users/:userId/orders      | Buscar pedido por id do usuário                    |
| POST   | /products/                 | Criar um produto                                   |
| GET    | /products                  | Listar todos os produtos                           |
| POST   | /orders                    | Criar um pedido                                    |
| GET    | /orders/:id                | Buscar pedido por id do pedido                     |
| PATCH  | /orders/:id/status         | Atulizar status do pedido                          |

### Enviroment

```bash
PORT=
DATABASE_URL=
SECRET_KEY=
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
```

## Documentação (Postman)
A documentação completa da API está disponível no Postman:

👉 **[Acessar Documentação](https://documenter.getpostman.com/view/31794206/2sB3WttK51)**  
