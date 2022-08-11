import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'example product',
    description: 'name of the product',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '10000',
    description: 'price of the product',
    required: true,
  })
  price: number;
}
