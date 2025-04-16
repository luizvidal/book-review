FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar o código fonte
COPY . .

# Aplicar patch para o problema do crypto.randomUUID()
RUN node scripts/typeorm-patch.js

# Compilar o projeto
RUN npm run build

EXPOSE 3001

# Iniciar o aplicativo
CMD ["node", "dist/main.js"]
