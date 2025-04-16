import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookResponseDto, BookWithRatingDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const book = this.booksRepository.create(createBookDto);
    const savedBook = await this.booksRepository.save(book);
    return new BookResponseDto(savedBook);
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.booksRepository.find();
    return books.map(book => new BookResponseDto(book));
  }

  async findAllWithRatings(): Promise<BookWithRatingDto[]> {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.reviews', 'review')
      .getMany();

    return books.map(book => {
      const bookDto = new BookWithRatingDto(book);

      if (book.reviews && book.reviews.length > 0) {
        const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
        bookDto.averageRating = parseFloat((totalRating / book.reviews.length).toFixed(1));
        bookDto.reviewCount = book.reviews.length;
      } else {
        bookDto.averageRating = 0;
        bookDto.reviewCount = 0;
      }

      return bookDto;
    });
  }

  async findOne(id: string): Promise<BookResponseDto> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['reviews', 'reviews.user'],
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }

    return new BookResponseDto(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookResponseDto> {
    // Buscar a entidade Book diretamente em vez de usar findOne que retorna BookResponseDto
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }

    Object.assign(book, updateBookDto);

    const updatedBook = await this.booksRepository.save(book);
    return new BookResponseDto(updatedBook);
  }

  async remove(id: string): Promise<void> {
    // Buscar a entidade Book diretamente em vez de usar findOne que retorna BookResponseDto
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }

    await this.booksRepository.remove(book);
  }
}
