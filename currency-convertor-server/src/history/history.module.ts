import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { ConversionHistory } from '../entities/conversion-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionHistory])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
