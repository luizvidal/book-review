FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Usar --legacy-peer-deps para ignorar conflitos de dependências
RUN npm install --legacy-peer-deps

COPY . .

# Adicionar polyfill para crypto
RUN echo "import * as crypto from 'crypto';\nglobal.crypto = crypto;" > crypto-polyfill.js

# Modificar o comando de inicialização para incluir o polyfill
RUN sed -i 's/"start:dev": "nest start --watch"/"start:dev": "node -r .\/crypto-polyfill.js node_modules\/.bin\/nest start --watch"/' package.json

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
