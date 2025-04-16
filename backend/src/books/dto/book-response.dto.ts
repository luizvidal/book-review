import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

export class BookResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único do livro' })
  id: string;

  @ApiProperty({ example: 'O Senhor dos Anéis', description: 'Título do livro' })
  title: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Autor do livro' })
  author: string;

  @ApiProperty({ example: 'Uma história épica de fantasia...', description: 'Descrição do livro' })
  description: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg', description: 'URL da imagem de capa do livro' })
  coverImage: string;

  @ApiProperty({ example: '2023-04-16T10:00:00Z', description: 'Data de criação do registro' })
  createdAt: Date;

  @ApiProperty({ example: '2023-04-16T10:30:00Z', description: 'Data da última atualização do registro' })
  updatedAt: Date;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}

export class BookWithRatingDto extends BookResponseDto {
  @ApiProperty({ example: 4.5, description: 'Nota média do livro baseada nas resenhas' })
  averageRating: number;

  @ApiProperty({ example: 10, description: 'Número total de resenhas do livro' })
  reviewCount: number;
}
