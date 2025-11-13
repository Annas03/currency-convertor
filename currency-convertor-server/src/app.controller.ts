import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCurrencies() {
    return this.appService.getCurrencies();
  }

  @Get('/exchange-rate')
  getExchangeRate(
    @Query()
    query: {
      date: string;
      base_currency?: string;
      currencies?: string;
    },
  ) {
    return this.appService.getHistoricalExchangeRate(query);
  }
}
