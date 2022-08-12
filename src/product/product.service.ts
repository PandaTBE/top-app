import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
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
}
