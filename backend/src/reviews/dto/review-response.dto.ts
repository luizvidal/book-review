import { ApiProperty } from '@nestjs/swagger';
import { BookResponseDto } from '../../books/dto/book-response.dto';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { Review } from '../entities/review.entity';

export class ReviewResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único da resenha' })
  id: string;

  @ApiProperty({ example: 'Este livro é incrível! Recomendo fortemente...', description: 'Conteúdo da resenha' })
  content: string;

  @ApiProperty({ example: 5, description: 'Nota da resenha (de 1 a 5)' })
  rating: number;

  @ApiProperty({ type: () => UserResponseDto, description: 'Usuário que escreveu a resenha' })
  user: UserResponseDto;

  @ApiProperty({ type: () => BookResponseDto, description: 'Livro que foi avaliado' })
  book: BookResponseDto;

  @ApiProperty({ example: '2023-04-16T10:00:00Z', description: 'Data de criação do registro' })
  createdAt: Date;

  @ApiProperty({ example: '2023-04-16T10:30:00Z', description: 'Data da última atualização do registro' })
  updatedAt: Date;

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);

    if (partial.user) {
      this.user = new UserResponseDto(partial.user);
    }

    if (partial.book) {
      this.book = new BookResponseDto(partial.book);
    }
  }
}
