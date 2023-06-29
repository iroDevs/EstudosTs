# Eslint junto do TypeScript

## Para utilizar o ESLint junto com o TypeScript, você precisa seguir alguns passos de configuração. Aqui está um guia passo a passo para configurar o ESLint com o TypeScript:

- Certifique-se de que você já possui o ESLint instalado no seu projeto. Caso contrário, você pode instalá-lo como uma dependência de desenvolvimento usando o npm ou o yarn:


> Agora, para adicionar suporte ao TypeScript, você precisa instalar algumas dependências adicionais. Execute o seguinte comando para instalar as dependências necessárias:

```bash
    npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin 
```

- inicia as configurações do eslint

```bash
 npx eslint --init
```

### Isso iniciará o processo de configuração interativo do ESLint. Você será solicitado a responder algumas perguntas para configurar o ESLint de acordo com suas preferências.

- Quando solicitado a selecionar o formato de configuração, escolha a opção ***"Use a popular style guide"***.-
- Em seguida, escolha o guia de estilo que você deseja usar. Por exemplo, você pode escolher "Airbnb" ou "Standard" como guias de estilo populares.
- Quando você for solicitado a instalar as dependências do guia de estilo, confirme a instalação das dependências necessárias.
- Voce pode escolher a ext do arquiv eslintrc para que fique mais facil nesse caso eu gosto de escolher a saida js
- Após a conclusão do assistente de configuração, um arquivo **.eslintrc.js** será criado no diretório raiz do seu projeto. Este arquivo contém as configurações do ESLint para o seu projeto.

### Esse arquivo .eslintrc.json é as configurações do seu eslint

- Após a instalação das dependências, abra o arquivo .eslintrc.json e adicione as seguintes configurações:

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    node: true
  },
  plugins: ['@typescript-eslint'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        'src/**/*.ts'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}


```

