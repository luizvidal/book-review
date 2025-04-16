import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do usuário logado' })
  @ApiResponse({ status: 200, description: 'Perfil obtido com sucesso', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getProfile(@Request() req): Promise<UserResponseDto> {
    // Converter para Promise para corresponder ao tipo de retorno
    return Promise.resolve(new UserResponseDto(req.user));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar perfil do usuário logado' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 409, description: 'Email já está em uso' })
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir perfil do usuário logado' })
  @ApiResponse({ status: 200, description: 'Perfil excluído com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  removeProfile(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
