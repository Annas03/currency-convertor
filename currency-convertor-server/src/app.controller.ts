import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ExchangeRateQueryDto,
  LatestExchangeRateQueryDto,
} from './dto/exchange-rate-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCurrencies() {
    return this.appService.getCurrencies();
  }

  @Get('/exchange-rate')
  getExchangeRate(@Query() query: ExchangeRateQueryDto) {
    return this.appService.getHistoricalExchangeRate(query);
  }

  @Get('/latest-exchange-rate')
  getLatestExchangeRate(@Query() query: LatestExchangeRateQueryDto) {
    return this.appService.getLatestExchangeRate(query);
  }
}
