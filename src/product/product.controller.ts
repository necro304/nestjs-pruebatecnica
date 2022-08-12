import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'The found record',
    content: {
      'application/json': {
        example: [
          {
            _id: '62f4485a88c782e1974...',
            name: 'example',
            price: 2000,
            user: '62f4480388c782e1974...',
            __v: 0,
          },
        ],
      },
    },
  })
  @ApiHeader({
    required: true,
    description: 'Bearer token',
    name: 'Authorization',
    example: 'bearer <access_token>',
  })
  findAll(@Request() req) {
    return this.productService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiHeader({
    required: true,
    description: 'Bearer token',
    name: 'Authorization',
    example: 'bearer <access_token>',
  })
  @ApiBody({ isArray: false, type: CreateProductDto })
  @ApiResponse({
    status: 201,
    isArray: true,
    description: 'create successfully',
    content: {
      'application/json': {
        example: {
          _id: '62f4485a88c782e1974...',
          name: 'example',
          price: 2000,
          user: '62f4480388c782e1974...',
          __v: 0,
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    console.log(req.user);
    return this.productService.create(createProductDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @ApiHeader({
    required: true,
    description: 'Bearer token',
    name: 'Authorization',
    example: 'bearer <access_token>',
  })
  @ApiBody({ isArray: false, type: CreateProductDto })
  @ApiResponse({
    status: 201,
    isArray: true,
    description: 'update successfully',
    content: {
      'application/json': {
        example: {
          _id: '62f4485a88c782e1974...',
          name: 'example',
          price: 2000,
          user: '62f4480388c782e1974...',
          __v: 0,
        },
      },
    },
  })
  update(@Body() product: UpdateProductDto, @Request() req) {
    return this.productService.update(product, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiHeader({
    required: true,
    description: 'Bearer token',
    name: 'Authorization',
    example: 'bearer <access_token>',
  })
  @ApiBody({ isArray: false, type: CreateProductDto })
  @ApiResponse({
    status: 201,
    isArray: true,
    description: 'delete successfully',
    content: {
      'application/json': {
        example: {
          _id: '62f4485a88c782e1974...',
          name: 'example',
          price: 2000,
          user: '62f4480388c782e1974...',
          __v: 0,
        },
      },
    },
  })
  delete(@Request() req) {
    console.log(req.params.id);
    return this.productService.delete(req.params.id, req.user.userId);
  }
}
