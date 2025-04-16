import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'O Senhor dos Anéis', description: 'Título do livro' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Autor do livro' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    example: 'Uma história épica de fantasia...',
    description: 'Descrição do livro',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'URL da imagem de capa do livro',
    required: false
  })
  @IsOptional()
  @IsString()
  coverImage?: string;
}
