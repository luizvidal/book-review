import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import { BookResponseDto, BookWithRatingDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso', type: BookResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros obtida com sucesso', type: [BookResponseDto] })
  findAll(): Promise<BookResponseDto[]> {
    return this.booksService.findAll();
  }

  @Get('with-ratings')
  @ApiOperation({ summary: 'Listar todos os livros com suas notas médias' })
  @ApiResponse({ status: 200, description: 'Lista de livros com notas obtida com sucesso', type: [BookWithRatingDto] })
  findAllWithRatings(): Promise<BookWithRatingDto[]> {
    return this.booksService.findAllWithRatings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um livro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do livro', type: 'string' })
  @ApiResponse({ status: 200, description: 'Livro obtido com sucesso', type: BookResponseDto })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  findOne(@Param('id') id: string): Promise<BookResponseDto> {
    return this.booksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um livro' })
  @ApiParam({ name: 'id', description: 'ID do livro', type: 'string' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso', type: BookResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<BookResponseDto> {
    return this.booksService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir um livro' })
  @ApiParam({ name: 'id', description: 'ID do livro', type: 'string' })
  @ApiResponse({ status: 200, description: 'Livro excluído com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
