import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login app' })
  @ApiBody({ isArray: false, type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Login successfully',
    isArray: false,
    content: {
      'application/json': {
        example: {
          user: {
            _id: '62f419adeb1d4f324160aae1',
            name: 'isaac',
            email: 'eljefe.isaac@gmail.com',
            password: '$2b$10$mMiMFt16fUIxgBL6puAF0epafJazi3...',
            __v: 0,
          },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp...',
        },
      },
    },
  })
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
  @Post('register')
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Register app' })
  @ApiResponse({
    status: 201,
    description: 'Register successfully',
    isArray: false,
    content: {
      'application/json': {
        example: {
          user: {
            _id: '62f419adeb1d4f324160aae1',
            name: 'isaac',
            email: 'eljefe.isaac@gmail.com',
            password: '$2b$10$mMiMFt16fUIxgBL6puAF0epafJazi3...',
            __v: 0,
          },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp...',
        },
      },
    },
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
