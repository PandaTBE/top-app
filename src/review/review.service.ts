import { CreateReviewDto } from './dto/create-review.dto';
import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewModel } from './review.model';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

/** nest g service review - команда для создания сервиса для модуля review */
@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
    }
}
