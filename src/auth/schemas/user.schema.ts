import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ example: 'Joe doe', description: 'full name' })
  name: string;

  @Prop()
  @ApiProperty({
    example: 'joe@example.com',
    description: 'email',
    required: true,
  })
  email: string;

  @Prop()
  @ApiProperty({
    example: 'passwe4234sddd',
    description: 'password',
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
