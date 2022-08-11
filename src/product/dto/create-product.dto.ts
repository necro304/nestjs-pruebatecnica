import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
