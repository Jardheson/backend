# Backend - Digital Store API

Este é o servidor backend da aplicação **Digital Store**, construído com Node.js, Express e Sequelize. Ele fornece uma API RESTful para gerenciamento de produtos, usuários, categorias e pedidos.

## Tecnologias

*   **Node.js** (v16+)
*   **Express**: Framework web rápido e minimalista.
*   **Sequelize**: ORM baseado em promises para Node.js (suporta Postgres, MySQL, MariaDB, SQLite e MSSQL).
*   **JWT (JSON Web Tokens)**: Para autenticação segura stateless.
*   **Swagger**: Para documentação automática da API.

---

## Instalação e Configuração

Siga os passos abaixo para rodar a API localmente:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalar Dependências
Navegue até a pasta `backend` e execute:

```bash
cd backend
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz da pasta `backend` (você pode copiar o `.env.example`):

```env
# Server Config
PORT=3000
NODE_ENV=development

# Database Config
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=digital_store
DB_DIALECT=postgres # ou mysql, sqlite

# Auth Secret
JWT_SECRET=sua_chave_secreta_aqui
```

### 4. Executar o Servidor

#### Modo de Desenvolvimento (com Nodemon)
```bash
npm run dev
```
O servidor iniciará em `http://localhost:3000`.

#### Modo de Produção
```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

---

## Documentação da API (Swagger)

A API possui uma documentação interativa completa gerada via Swagger.

**Acesse:** `http://localhost:3000/api-docs`

Lá você pode testar todos os endpoints, ver os schemas de requisição/resposta e entender os métodos de autenticação necessários.

---

## Estrutura do Banco de Dados

O projeto utiliza o **Sequelize** para modelagem de dados. Ao iniciar a aplicação em modo de desenvolvimento, o Sequelize tentará sincronizar as tabelas automaticamente (`sequelize.sync`).

### Principais Tabelas
*   **Users**: Usuários e administradores.
*   **Products**: Catálogo de produtos.
*   **Categories**: Categorias de produtos.
*   **ProductImages**: Imagens associadas aos produtos.
*   **ProductOptions**: Variações de produtos (cores, tamanhos).

---

## Autenticação

A maioria das rotas de escrita (POST, PUT, DELETE) são protegidas e requerem um Token JWT.

1.  Faça login na rota `/v1/auth/token` (ou crie um usuário).
2.  Copie o `token` retornado.
3.  Nas requisições protegidas, adicione o header:
    ```
    Authorization: Bearer SEU_TOKEN_AQUI
    ```
    *(No Swagger, clique no botão "Authorize" e cole o token)*.

---

## Endpoints Principais

### Autenticação
- POST `/v1/user` - cria usuário (201)
- POST `/v1/user/token` - autentica e retorna JWT (200)

### Usuário
- GET `/v1/user/:id` - busca usuário (200/404)
- PUT `/v1/user/:id` - atualiza usuário (204/400/401/404)
- DELETE `/v1/user/:id` - apaga usuário (204/401/404)

### Categoria
- GET `/v1/category/search` - lista categorias (200/400)
- GET `/v1/category/:id` - busca categoria (200/404)
- POST `/v1/category` - cria categoria (201/400/401)
- PUT `/v1/category/:id` - atualiza categoria (204/400/401/404)
- DELETE `/v1/category/:id` - apaga categoria (204/401/404)

### Produto
- GET `/v1/product/search` - lista produtos com filtros (200/400)
- GET `/v1/product/:id` - busca produto (200/404)
- POST `/v1/product` - cria produto (201/400/401)
- PUT `/v1/product/:id` - atualiza produto (204/400/401/404)
- DELETE `/v1/product/:id` - apaga produto (204/401/404)

---

## Estrutura de Pastas

```bash
src/
├── config/        # Configurações de banco de dados e ferramentas
├── controllers/   # Controladores (Lógica de entrada/saída das requisições)
├── middleware/    # Middlewares (Auth, Validação, Erros)
├── models/        # Definição das tabelas e relacionamentos (Sequelize)
├── routes/        # Definição das rotas da API
├── services/      # Regras de negócio complexas
├── app.js            # Configuração principal do Express
└── server.js         # Ponto de entrada do servidor
```

---

## Autor

**Jardheson Oliveira**
*Software Engineer*

