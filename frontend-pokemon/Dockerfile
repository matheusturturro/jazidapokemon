FROM node:20-alpine as build

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY src/ ./src/

# Build para produção
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar os arquivos de build do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração do nginx personalizada, se necessário
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta
EXPOSE 5173

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 