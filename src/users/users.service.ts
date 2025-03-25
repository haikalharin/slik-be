import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { User } from '../auth/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        username: username, // or simply { username }
      },
    });
  }

  async checkUserExistsByUsername(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    return !!user; // Returns true if user exists, false otherwise
  }

  async checkUserExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email } });
    return !!user; // Returns true if user exists, false otherwise
  }

  async amd5Hash(data: string): Promise<string> {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  async verifyMd5Hash(data: string, hashed: string): Promise<boolean> {
    const hash = crypto.createHash('md5').update(data).digest('hex');
    return hash === hashed;
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  //
  // findAll() {
  //   return `This action returns all user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
