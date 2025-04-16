import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Review } from '../reviews/entities/review.entity';

/**
 * Configuração do TypeORM que não depende de crypto.randomUUID()
 */
export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [User, Book, Review],
    synchronize: true, // Não use em produção
    autoLoadEntities: true,
    logging: configService.get('NODE_ENV') === 'development',
  };
};
