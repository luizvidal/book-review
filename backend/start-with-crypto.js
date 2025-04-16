// Adicionar polyfill para crypto.randomUUID()
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = {
    randomUUID: () => crypto.randomUUID()
  };
  console.log('Polyfill para crypto.randomUUID() adicionado com sucesso!');
}

// Carregar o aplicativo
require('./dist/main');
