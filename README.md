# Simple login system with node and React

## Configuração do Servidor (node;js)

- Incluir no `package.json` o **"type": "module"** para funcionar com `ES6`
- Incluir também nos scripts `nodemon -l ./src/server.js`

```bash
mkdir server
cd server
npm init -y
npm install express dotenv cors multer mongoose
npm install nodemon --save-dev
```


- **Arquivo .env**

```env
MONGO_URI=sua_string_de_conexao_do_mongodb
```

## Configuração do Cliente (React)

```bash
npx create-next-app@latest client
cd client

npm install axios react-router-dom bootstrap react-bootstrap
```

- **Estrutura Final do Projeto**

```
/
├── server/
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── uploads/ (pasta criada automaticamente para armazenar avatares)
└── client/
    ├── node_modules/
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   └── ... (outros arquivos do React)
    ├── package.json
    ├── package-lock.json
    └── public/
```
