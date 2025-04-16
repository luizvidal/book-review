import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para permitir requisições do frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Book Review API')
    .setDescription('API para o sistema de resenhas de livros')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('users', 'Endpoints de usuários')
    .addTag('books', 'Endpoints de livros')
    .addTag('reviews', 'Endpoints de resenhas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Usar porta 3001 para o backend para evitar conflito com o frontend (porta 3000)
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Documentação Swagger disponível em: http://localhost:${port}/api`);
}
bootstrap();
