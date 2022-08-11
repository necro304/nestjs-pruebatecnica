import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UserService } from '../auth/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly userService: UserService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    console.log('user', userId);
    const user = await this.userService.findById(userId);

    const createdProduct = new this.productModel({
      ...createProductDto,
      user,
    });
    return createdProduct.save();
  }

  async findAll(userId: string): Promise<Product[]> {
    return this.productModel.find({ user: userId }).exec();
  }
}
