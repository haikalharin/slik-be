import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { MasterCity } from './entities/master.city';
import { MasterService } from './master.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    SequelizeModule.forFeature([MasterCity]),
  ],
  providers: [MasterService],
  exports: [MasterService, SequelizeModule.forFeature([MasterCity])],
})
export class MasterModule {}
