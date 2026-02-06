# 🔙 Backend - Digital Store API

Este é o servidor backend da aplicação **Digital Store**, construído com Node.js, Express e Sequelize. Ele fornece uma API RESTful para gerenciamento de produtos, usuários, categorias e pedidos.

## 🚀 Tecnologias

*   **Node.js** (v16+)
*   **Express**: Framework web rápido e minimalista.
*   **Sequelize**: ORM baseado em promises para Node.js (suporta Postgres, MySQL, MariaDB, SQLite e MSSQL).
*   **JWT (JSON Web Tokens)**: Para autenticação segura stateless.
*   **Swagger**: Para documentação automática da API.

---

## 🛠️ Instalação e Setup

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalar Dependências
Navegue até a pasta `backend` e execute:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz da pasta `backend` (você pode copiar o `.env.example`):

```env
# Server Config
PORT=3000
NODE_ENV=development

# Database Config (Exemplo com MySQL/Postgres)
DB_HOST=localhost
DB_USER=root
DB_PASS=senha123
DB_NAME=digital_store
DB_DIALECT=mysql # ou postgres, sqlite

# Auth Config
JWT_SECRET=sua_chave_secreta_super_segura
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

---

## 📚 Documentação da API (Swagger)

A documentação interativa da API está disponível automaticamente quando o servidor está rodando.

*   **URL da Documentação**: `http://localhost:3000/api-docs`

Lá você pode testar todos os endpoints, ver os schemas de requisição/resposta e entender os métodos de autenticação necessários.

---

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza o **Sequelize** para modelagem de dados. Ao iniciar a aplicação em modo de desenvolvimento, o Sequelize tentará sincronizar as tabelas automaticamente (`sequelize.sync`).

### Principais Tabelas
*   **Users**: Usuários e administradores.
*   **Products**: Catálogo de produtos.
*   **Categories**: Categorias de produtos.
*   **ProductImages**: Imagens associadas aos produtos.
*   **ProductOptions**: Variações de produtos (cores, tamanhos).

---

## 🔐 Autenticação

A maioria das rotas de escrita (POST, PUT, DELETE) são protegidas e requerem um Token JWT.

1.  Faça login na rota `/v1/auth/token` (ou crie um usuário).
2.  Copie o `token` retornado.
3.  Nas requisições protegidas, adicione o header:
    ```
    Authorization: Bearer SEU_TOKEN_AQUI
    ```
    *(No Swagger, clique no botão "Authorize" e cole o token)*.

---

## 🧪 Estrutura de Pastas

```bash
src/
├── config/        # Configurações (Database, Swagger)
├── controllers/   # Lógica de controle (Req/Res)
├── middleware/    # Middlewares (Auth, Validações)
├── models/        # Modelos do Sequelize
├── routes/        # Definição de Rotas
├── services/      # Regras de Negócio
└── app.js         # Configuração do App Express
```

---

## ✒️ Autor

**Jardheson Oliveira**
*Software Engineer*
