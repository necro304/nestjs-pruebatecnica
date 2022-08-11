import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const payload = { id: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);
    return {
      user,
      token,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const password = await hash(createUserDto.password, 10);
    const body = { ...createUserDto, password };

    const user = await this.userService.create(body);

    const payload = { id: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
