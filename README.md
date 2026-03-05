# 🔙 Backend API - Digital Store

> **RESTful API Service developed with Node.js, Express & Sequelize**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## 📖 Sobre o Projeto

Este diretório contém o servidor backend da aplicação **Digital Store**. Ele foi projetado para ser uma API robusta e escalável, responsável por gerenciar toda a lógica de negócios, autenticação e persistência de dados da plataforma de e-commerce.

Embora o frontend atual tenha integração nativa com **Supabase**, este backend Node.js serve como uma alternativa completa e customizável, oferecendo controle total sobre a infraestrutura e regras de negócio.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um stack moderno e eficiente:

* **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript server-side.
* **[Express](https://expressjs.com/)**: Framework web rápido, unopinionated e minimalista.
* **[Sequelize](https://sequelize.org/)**: ORM (Object-Relational Mapper) poderoso baseada em Promises.
* **[JWT](https://jwt.io/)**: Padrão para autenticação segura e stateless.
* **[Swagger](https://swagger.io/)**: Ferramenta para design, construção e documentação da API.
* **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Biblioteca para hash de senhas.

---

## ✨ Funcionalidades

A API fornece endpoints para cobrir os principais requisitos do e-commerce:

* **🔐 Autenticação & Autorização**:
  * Registro e Login de usuários.
  * Geração e validação de Tokens JWT.
  * Middlewares de proteção de rotas.
* **📦 Gestão de Produtos**:
  * CRUD completo de produtos.
  * Filtragem por categorias, preço e marca.
  * Gestão de imagens e variações (cores/tamanhos).
* **👤 Gestão de Usuários**:
  * Perfil do usuário.
  * Histórico de pedidos.
* **🛒 Pedidos (Orders)**:
  * Criação e processamento de pedidos.
  * Atualização de status.

---

## 🛠️ Instalação e Configuração

Siga os passos abaixo para rodar a API localmente:

### 1. Pré-requisitos

* Node.js (v16 ou superior)
* Banco de Dados SQL (PostgreSQL, MySQL ou SQLite)

### 2. Instalação

Navegue até a pasta do backend e instale as dependências:

```bash
cd backend
npm install
```

### 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `backend` baseando-se no exemplo:

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

### 4. Executando o Servidor

**Modo de Desenvolvimento (com Hot-Reload):**

```bash
npm run dev
```

**Modo de Produção:**

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

---

## 📚 Documentação da API (Swagger)

A API possui uma documentação interativa completa gerada via Swagger.

👉 **Acesse:** `http://localhost:3000/api-docs`

Lá você poderá:

* Visualizar todos os endpoints disponíveis.
* Testar requisições diretamente pelo navegador.
* Ver os esquemas de dados (Models).
* Entender os requisitos de autenticação (Bearer Token).

---

## 🗄️ Estrutura do Projeto

A arquitetura segue o padrão MVC (Model-View-Controller) adaptado para APIs:

```bash
src/
├── 📂 config/        # Configurações de banco de dados e ferramentas
├── 📂 controllers/   # Controladores (Lógica de entrada/saída das requisições)
├── 📂 middleware/    # Middlewares (Auth, Validação, Erros)
├── 📂 models/        # Definição das tabelas e relacionamentos (Sequelize)
├── 📂 routes/        # Definição das rotas da API
├── 📂 services/      # Regras de negócio complexas
├── app.js            # Configuração principal do Express
└── server.js         # Ponto de entrada do servidor
```

---

## ✒️ Autor

**Jardheson Oliveira**
*Software Engineer*

