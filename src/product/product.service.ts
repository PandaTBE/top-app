import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from 'src/review/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productmodel: ModelType<ProductModel>) {}

    async create(dto: CreateProductDto) {
        return this.productmodel.create(dto);
    }

    async findById(id: string) {
        return this.productmodel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productmodel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productmodel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productmodel
            .aggregate([
                {
                    $match: {
                        categories: dto.category,
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
                {
                    $limit: dto.limit,
                },
                {
                    $lookup: {
                        from: 'Review',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'review',
                    },
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$review' },
                        reviewAvg: { $avg: '$review.rating' },
                    },
                },
            ])
            .exec() as unknown as (ProductModel & { review: ReviewModel[]; reviewCount: number; reviewAvg: number })[];
    }
}
