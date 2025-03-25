import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseUtil } from '../utils/response.util';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './entities/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: Record<string, any>) {
    const userData = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    if (!userData) {
      return ResponseUtil.error('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return ResponseUtil.success({
      userId: userData.userId,
      username: userData.username,
      token: userData.token,
    });
  }

  @Post('create')
  async create(@Body() createUserDto: Partial<User>) {
    // try {
    const userExists = await this.usersService.checkUserExistsByUsername(
      createUserDto.username,
    );
    if (userExists) {
      return ResponseUtil.error('User Exist', HttpStatus.CONFLICT);
    } else {
      return this.authService.createUser(createUserDto);
    }
    // }catch (error){
    //     return ResponseUtil.error('Invalid credentials', HttpStatus.BAD_REQUEST);
    //
    // }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllUser')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('getenv')
  getEnv(): Promise<string> {
    return this.authService.getDatabaseHost();
  }
}
