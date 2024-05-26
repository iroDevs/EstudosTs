## Intalar o Ts
```bash
npm i typescript -D
```
isso vai instlar o typescript como dependencia de desenvolvimento 

## RODAR o Tsc para gerar o arquivo de configuração do ts

```bash
npx  tsc --init
```

### OPCIONAL TSX para melhorar o desenvolvimento

```bash
npm i tsx -D
```

essa biblioteca vai deixar mais eficiente o uso do typescript
basta no packge do projeto colocar para rodar com o tsx : "tsx src/main.ts"

> o tsx possui metodo de watch para rodar

criar uma chave especificando o watch no packge

> dev: "tsx watch src/main.ts"

 ### OPCIONAL tsup para melhorar build
 como nos queremos que o ts seja executado apenas em desenvolvimento e em produção seja js normal 
 p tsup faz isso de forma mais eficiente simplificando e acelerando o build

 ```bash
npm i tsup -D
```

crie uma chave para o build chamando o tsup

"build": "tsup src"

rodando o build agora sera pelo tsup


### TESTES - vitest sem config
o vitest traz suporte para o typescript sem qualquer tipo de configuração extra

```
npm i vitest -D
```

test: "vitest"


