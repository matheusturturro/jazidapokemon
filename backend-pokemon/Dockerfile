FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./
COPY .sequelizerc ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY src/ ./src/

# Compilar o TypeScript
RUN npm run build

# Expor a porta
EXPOSE 8088

# Executar migrações e iniciar o servidor
CMD npm run db:migrate && npm start 