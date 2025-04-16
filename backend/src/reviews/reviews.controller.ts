import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova resenha' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Resenha criada com sucesso', type: ReviewResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req,
  ): Promise<ReviewResponseDto> {
    return this.reviewsService.create(createReviewDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as resenhas' })
  @ApiResponse({ status: 200, description: 'Lista de resenhas obtida com sucesso', type: [ReviewResponseDto] })
  findAll(): Promise<ReviewResponseDto[]> {
    return this.reviewsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-reviews')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas as resenhas do usuário logado' })
  @ApiResponse({ status: 200, description: 'Lista de resenhas do usuário obtida com sucesso', type: [ReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findMyReviews(@Request() req): Promise<ReviewResponseDto[]> {
    return this.reviewsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma resenha pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da resenha', type: 'string' })
  @ApiResponse({ status: 200, description: 'Resenha obtida com sucesso', type: ReviewResponseDto })
  @ApiResponse({ status: 404, description: 'Resenha não encontrada' })
  findOne(@Param('id') id: string): Promise<ReviewResponseDto> {
    return this.reviewsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar uma resenha' })
  @ApiParam({ name: 'id', description: 'ID da resenha', type: 'string' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Resenha atualizada com sucesso', type: ReviewResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Você não tem permissão para editar esta resenha' })
  @ApiResponse({ status: 404, description: 'Resenha não encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req,
  ): Promise<ReviewResponseDto> {
    return this.reviewsService.update(id, updateReviewDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir uma resenha' })
  @ApiParam({ name: 'id', description: 'ID da resenha', type: 'string' })
  @ApiResponse({ status: 200, description: 'Resenha excluída com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Você não tem permissão para excluir esta resenha' })
  @ApiResponse({ status: 404, description: 'Resenha não encontrada' })
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.reviewsService.remove(id, req.user);
  }
}
