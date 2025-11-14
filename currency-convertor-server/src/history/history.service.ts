import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionHistory } from '../entities/conversion-history.entity';
import { CreateHistoryDto } from '../dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(ConversionHistory)
    private historyRepository: Repository<ConversionHistory>,
  ) {}

  async createHistory(
    ipAddress: string,
    createHistoryDto: CreateHistoryDto,
  ): Promise<ConversionHistory> {
    const history = this.historyRepository.create({
      ip_address: ipAddress,
      base_currency: createHistoryDto.base_currency,
      base_price: createHistoryDto.base_price,
      conversion_currency: createHistoryDto.conversion_currency,
      conversion_price: createHistoryDto.conversion_price,
      exchange_rate: createHistoryDto.exchange_rate,
      historical_date: createHistoryDto.historical_date
        ? new Date(createHistoryDto.historical_date)
        : null,
    });

    const savedHistory = await this.historyRepository.save(history);
    return savedHistory;
  }

  async getHistoryByIp(ipAddress: string): Promise<ConversionHistory[]> {
    return await this.historyRepository.find({
      where: { ip_address: ipAddress },
      order: { created_at: 'DESC' },
    });
  }
}
