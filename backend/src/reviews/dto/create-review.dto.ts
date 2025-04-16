import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Este livro é incrível! Recomendo fortemente...',
    description: 'Conteúdo da resenha'
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 5,
    description: 'Nota da resenha (de 1 a 5)',
    minimum: 1,
    maximum: 5
  })
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do livro que está sendo avaliado'
  })
  @IsNotEmpty()
  @IsUUID()
  bookId: string;
}
