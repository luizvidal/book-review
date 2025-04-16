/**
 * Este script corrige o problema do crypto.randomUUID() no TypeORM
 * Ele modifica diretamente o arquivo problemático
 */

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo problemático
const filePath = path.join(__dirname, '../node_modules/@nestjs/typeorm/dist/common/typeorm.utils.js');

// Verificar se o arquivo existe
if (fs.existsSync(filePath)) {
  // Ler o conteúdo do arquivo
  let content = fs.readFileSync(filePath, 'utf8');

  // Substituir a linha problemática
  const problemLine = 'const generateString = () => crypto.randomUUID();';
  const fixedLine = 'const generateString = () => require("crypto").randomUUID();';

  if (content.includes(problemLine)) {
    content = content.replace(problemLine, fixedLine);
    
    // Escrever o conteúdo modificado de volta para o arquivo
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('Patch aplicado com sucesso!');
  } else {
    console.log('O arquivo já foi corrigido ou a linha problemática não foi encontrada.');
  }
} else {
  console.error(`Arquivo não encontrado: ${filePath}`);
}
