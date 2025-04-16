/**
 * Este script corrige o problema do crypto.randomUUID() no TypeORM
 * Ele substitui a chamada para crypto.randomUUID() por uma implementação alternativa
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Adicionar crypto global com randomUUID
global.crypto = {
  randomUUID: () => uuidv4()
};

console.log('Patch aplicado: crypto.randomUUID() agora está disponível globalmente');
