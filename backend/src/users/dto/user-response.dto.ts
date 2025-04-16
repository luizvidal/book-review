import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único do usuário' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email do usuário' })
  email: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiProperty({ example: '2023-04-16T10:00:00Z', description: 'Data de criação do registro' })
  createdAt: Date;

  @ApiProperty({ example: '2023-04-16T10:30:00Z', description: 'Data da última atualização do registro' })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
