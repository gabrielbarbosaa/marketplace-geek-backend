import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
