import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

// Removemos a propriedade id, pois o ID já é passado como parâmetro de rota
export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
