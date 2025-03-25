import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './users/users.module';
import { MasterModule } from './master/master.module';
import { MasterController } from './master/master.controller';
import { MasterService } from './master/master.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}` || '.env.development',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // Convert port to number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true, // Use cautiously in production
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with a more secure key in production
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    AuthModule,
    UserModule,
    MasterModule,
  ],
  controllers: [AppController, AuthController, MasterController],
  providers: [AppService, AuthService, MasterService],
})
export class AppModule {}
