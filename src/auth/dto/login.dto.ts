import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'joe@example.com',
    description: 'email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'passwe4234sddd',
    description: 'password',
    required: true,
  })
  password: string;
}
