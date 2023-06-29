# Node com typescript

- passo "Intalar o typescript" como dependencia de desenvolvimento
```bash
	npm i -D typescript
```
- caso queira uma ferramenta mais veloz para fazer o build instale o sucrase
```bash
	npm i -D sucrase
```
Caso esteja utilizando o nodemon , devemos criar um arquivo de modificação para que o nodemon entenda que deve vigiar os arquivos ts dentro da pasta src, veja abaixo

crie uma pasta na raiz do projeto chamado nodemon.json

nodemon.json 
```json
    {
    "watch": ["src"],
    "ext": "ts",
    "execMap": {
        "ts": "sucrase-node src/server.ts"
    }
}
```
> Basicamente estamos dizendo para o nodemon ficar vigiando os arquivos dentro de src que cotem a extensão ts , e rodar o comando dentro do execMap quando esses arquivos sofrerem alterações , logo isso basta iniciar o projeto com o nodemon chamando "nodemon src/server.ts"


agora vamos adcionar um aquivo chamado tsconfig.jsons na raiz do projeto passando para ele oque vai ter de configuração em nosso ts veja o exemplo:

```json
{
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "outDir": "dist",
      "rootDir": "src",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "skipLibCheck": true,
      "strictNullChecks": true
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
  }
```
> nesse exemplo estamos especificando que o root dir que e a pasta princiapl é a src e que , a pasta de saida onde meus js vao ficar armazenados é a dist

veja como ficou meu "build" comand na package de configuração:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.ts",
    "build": "tsc --project tsconfig.json"
  },
```

# rodando com express 

- Depois do typscript configurado , é necessario a instalação de tipos que serem usadas no projeto como por exemplo os tipos do express
por exemplo nesse exemplo de projeto eu tenho o "cors" e o "express" nesse caso preciso da tipagem de tipos

padrão de sintaxe: @types/NOME_DO_PACOTE

```bash
  npm install  -D @types/express @types/cors
```


### Exemplo do server.ts 

```ts
import express = require('express')
import cors = require('cors')

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.index()
  }

  private index (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private middleware (): void {
    // config dos middleware
  }

  private dataBase (): void {
    // confi do banco de dados
  }

  private route (): void {
    // config das rotas
  }
}

export default App


```

perceba que a variavel exprres atributo da classe app agora é meu app -> do expres ou seja this.express : e aqui dentro tenho todas as definições que ja conheço do express