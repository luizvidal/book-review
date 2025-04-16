import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { User } from '../users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private booksService: BooksService,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User): Promise<ReviewResponseDto> {
    const book = await this.booksService.findOne(createReviewDto.bookId);

    const review = this.reviewsRepository.create({
      content: createReviewDto.content,
      rating: createReviewDto.rating,
      user,
      book,
    });

    const savedReview = await this.reviewsRepository.save(review);
    return new ReviewResponseDto(savedReview);
  }

  async findAll(): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewsRepository.find({
      relations: ['user', 'book'],
    });

    return reviews.map(review => new ReviewResponseDto(review));
  }

  async findAllByUser(userId: string): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });

    return reviews.map(review => new ReviewResponseDto(review));
  }

  async findOne(id: string): Promise<ReviewResponseDto> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });

    if (!review) {
      throw new NotFoundException(`Resenha com ID ${id} não encontrada`);
    }

    return new ReviewResponseDto(review);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, user: User): Promise<ReviewResponseDto> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException(`Resenha com ID ${id} não encontrada`);
    }

    if (review.user.id !== user.id) {
      throw new UnauthorizedException('Você não tem permissão para editar esta resenha');
    }

    // Atualizar apenas os campos fornecidos no DTO
    if (updateReviewDto.content !== undefined) {
      review.content = updateReviewDto.content;
    }

    if (updateReviewDto.rating !== undefined) {
      review.rating = updateReviewDto.rating;
    }

    const updatedReview = await this.reviewsRepository.save(review);
    return new ReviewResponseDto(updatedReview);
  }

  async remove(id: string, user: User): Promise<void> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException(`Resenha com ID ${id} não encontrada`);
    }

    if (review.user.id !== user.id) {
      throw new UnauthorizedException('Você não tem permissão para excluir esta resenha');
    }

    await this.reviewsRepository.remove(review);
  }
}
