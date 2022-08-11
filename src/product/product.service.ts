import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UserService } from '../auth/user.service';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async update(
    updateProductDto: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    console.log('user', userId);
    const user = await this.userService.findById(userId);
    if (!user) throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    const prod = await this.productModel.findById(updateProductDto._id);

    if (!prod) throw new HttpException('Invalid product', HttpStatus.FORBIDDEN);

    console.log('prod', prod.user.toString());
    if (prod.user.toString() !== userId) {
      throw new HttpException('you are not the owner', HttpStatus.FORBIDDEN);
    }
    const product = this.productModel.findByIdAndUpdate(
      { _id: updateProductDto._id },
      updateProductDto,
      { new: true },
    );
    return product;
  }

  async delete(productId: string, userId: string): Promise<Product> {
    const user = await this.userService.findById(userId);
    if (!user) throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    const prod = await this.productModel.findById(productId);

    if (!prod) throw new HttpException('Invalid product', HttpStatus.FORBIDDEN);

    console.log('prod', prod.user.toString());
    if (prod.user.toString() !== userId) {
      throw new HttpException('you are not the owner', HttpStatus.FORBIDDEN);
    }
    return prod.remove();
  }

  async findAll(userId: string): Promise<Product[]> {
    return this.productModel.find({ user: userId }).exec();
  }
}
