# Guia de Deploy e Configuração do Supabase

Como sou uma inteligência artificial rodando localmente, não tenho acesso direto à sua conta do Supabase para criar o projeto automaticamente. No entanto, preparei todo o código para ser compatível.

Siga os passos abaixo para colocar seu backend no ar:

## 1. Configurar o Banco de Dados (Supabase)

O Supabase será usado para hospedar o banco de dados PostgreSQL.

1. Acesse [supabase.com](https://supabase.com/) e crie uma conta/login.
2. Clique em **"New Project"**.
3. Preencha os detalhes (Nome, Senha do Banco, Região). **Guarde a senha!**
4. Aguarde o projeto ser criado.
5. Vá em **Project Settings** (ícone de engrenagem) -> **Database**.
6. Em **Connection parameters**, desmarque "Use connection pooling" (para pegar a porta 5432 direta) ou mantenha (porta 6543) - o Sequelize suporta ambos, mas recomenda-se Transaction Mode (6543) para serverless ou Session Mode (5432) para servidores long-running como este.
   - Recomendo usar a conexão direta (Porta 5432) se for hospedar no Render/Railway.
7. Copie os dados: Host, User, Port, Database name.

## 2. Configurar Variáveis de Ambiente

Abra o arquivo `.env` dentro da pasta `backend/` e preencha com os dados do Supabase:

```env
DB_HOST=aws-0-us-east-1.pooler.supabase.com (ou o seu host)
DB_USER=postgres.seu-projeto
DB_PASS=sua-senha-definida-na-criacao
DB_NAME=postgres
DB_PORT=5432 (ou 6543)
DB_DIALECT=postgres
JWT_SECRET=crie_uma_senha_segura_para_o_token
PORT=3000
```

## 3. Hospedar a Aplicação Node.js (Backend)

O Supabase hospeda o banco, mas você precisa de um servidor para rodar o Node.js. Recomendo o **Render** ou **Railway** (ambos têm planos gratuitos ou baratos e são fáceis de usar).

### Opção A: Render (Recomendado)

1. Crie um repositório no GitHub e suba o código da pasta `backend`.
2. Crie uma conta no [render.com](https://render.com/).
3. Clique em **New +** -> **Web Service**.
4. Conecte seu repositório do GitHub.
5. Configurações:
   - **Root Directory:** `backend` (importante, pois seu package.json está lá)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Em **Environment Variables**, adicione as mesmas variáveis do seu `.env` (DB_HOST, DB_USER, etc).
7. Clique em **Create Web Service**.

O Render vai baixar seu código, instalar as dependências e iniciar o servidor. Como configuramos o `sequelize.sync` no `app.js`, ele criará as tabelas automaticamente na primeira execução.

## 4. Testar

Após o deploy, você terá uma URL (ex: `https://seu-projeto.onrender.com`).
Teste a rota de status ou tente criar um usuário via POST em `/v1/user`.
