# Projeto de Gerenciamento de Pokémons 🎮

Este é um projeto que permite gerenciar uma coleção de Pokémons! Você pode criar novos Pokémons, ver todos os que já existem, atualizar informações e até mesmo deletar Pokémons que não quer mais.

## 📋 Pré-requisitos

Antes de começar, você precisará instalar algumas ferramentas no seu computador:

1. **Node.js**
   - Acesse [nodejs.org](https://nodejs.org)
   - Baixe a versão "LTS" (mais estável)
   - Execute o instalador e siga as instruções na tela
   - Para verificar se instalou corretamente, abra o Prompt de Comando (CMD) e digite:
     ```
     node --version
     ```
     Você deve ver um número como "v18.x.x"

2. **PostgreSQL**
   - Acesse [postgresql.org](https://www.postgresql.org/download)
   - Baixe a versão para Windows
   - Durante a instalação:
     - Anote a senha que você definir para o usuário 'postgres' (5432)
     - Mantenha a porta padrão (5432)
   - Para verificar se instalou, procure por "pgAdmin" no menu iniciar

## 🚀 Como Executar o Projeto

### 1. Preparando o Ambiente

1. **Clone o projeto**
   - Crie uma pasta onde você quer guardar o projeto
   - Abra o Prompt de Comando (CMD) nessa pasta
   - Digite:
     ```
     git clone [URL_DO_PROJETO]
     cd desafio-jazida
     ```

2. **Instale as dependências**
   - No mesmo Prompt de Comando, digite:
     ```
     npm install
     ```
   - Isso vai instalar todas as bibliotecas necessárias
   - Pode demorar alguns minutos

3. **Configure o banco de dados**
   - Abra o pgAdmin (instalado com PostgreSQL)
   - Crie um novo banco de dados chamado "pokemondb"
   - Abra o arquivo `src/sequelize.ts`
   - Verifique se as configurações estão corretas:
     ```typescript
     username: 'postgres',
     password: 'postgres', // Use a senha que você definiu na instalação
     database: 'pokemondb',
     ```

### 2. Executando o Projeto

1. **Inicie o servidor**
   - No Prompt de Comando, digite:
     ```
     npm start
     ```
   - Você verá uma mensagem dizendo que o servidor está rodando
   - Mantenha esta janela aberta

2. **Teste a API**
   - Instale o Postman (ferramenta para testar APIs)
   - Baixe em [postman.com](https://www.postman.com/downloads)
   - Abra o Postman e crie uma nova requisição
   - Use a URL: `http://localhost:3000/pokemons`

## 📚 O que cada parte do projeto faz?

### Estrutura de Pastas

- `src/`: Pasta principal com todo o código
  - `controllers/`: Contém a lógica do que o programa faz
  - `models/`: Define como os dados são organizados
  - `routes/`: Define os caminhos (URLs) que você pode acessar
  - `config/`: Arquivos de configuração
  - `migrations/`: Controle de versão do banco de dados

### O que você pode fazer?

1. **Criar um Pokémon**
   - Método: POST
   - URL: `http://localhost:3000/pokemons`
   - Exemplo de dados:
     ```json
     {
       "tipo": "pikachu",
       "treinador": "Ash"
     }
     ```

2. **Ver todos os Pokémons**
   - Método: GET
   - URL: `http://localhost:3000/pokemons`

3. **Ver um Pokémon específico**
   - Método: GET
   - URL: `http://localhost:3000/pokemons/1` (onde 1 é o ID do Pokémon)

4. **Atualizar um Pokémon**
   - Método: PUT
   - URL: `http://localhost:3000/pokemons/1`
   - Exemplo de dados:
     ```json
     {
       "treinador": "Misty"
     }
     ```

5. **Deletar um Pokémon**
   - Método: DELETE
   - URL: `http://localhost:3000/pokemons/1`

## 🔍 Explicação Técnica

Este projeto usa várias tecnologias importantes:

1. **Node.js**
   - É um programa que permite rodar JavaScript no computador
   - É como um motor que faz tudo funcionar

2. **TypeScript**
   - É uma versão melhorada do JavaScript
   - Ajuda a evitar erros no código

3. **Express**
   - É uma biblioteca que facilita criar servidores web
   - Gerencia as requisições que chegam ao servidor

4. **PostgreSQL**
   - É um banco de dados
   - Guarda todas as informações dos Pokémons

5. **Sequelize**
   - É uma ferramenta que facilita trabalhar com o banco de dados
   - Traduz comandos JavaScript para comandos do banco de dados

## 🆘 Solução de Problemas

Se algo não funcionar:

1. **Erro de conexão com banco de dados**
   - Verifique se o PostgreSQL está rodando
   - Confirme se as senhas estão corretas
   - Verifique se o banco "pokemondb" existe

2. **Erro ao iniciar o servidor**
   - Verifique se o Node.js está instalado corretamente
   - Tente rodar `npm install` novamente
   - Verifique se a porta 3000 não está sendo usada

3. **Erro ao criar Pokémon**
   - Verifique se está usando um tipo válido (pikachu, charizard ou mewtwo)
   - Confirme se todos os campos obrigatórios foram preenchidos

