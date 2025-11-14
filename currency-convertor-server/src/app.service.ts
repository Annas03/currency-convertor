import { Injectable } from '@nestjs/common';
import {
  ExchangeRateQueryDto,
  LatestExchangeRateQueryDto,
} from './dto/exchange-rate-query.dto';

@Injectable()
export class AppService {
  async getCurrencies() {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_CmNgwhl9sgzQQA4ET1WHRxk7x7ZiT6UcBZyuyPjV`,
    );
    const currencies = await response.json();
    return currencies;
  }

  async getHistoricalExchangeRate(params: ExchangeRateQueryDto) {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/historical?apikey=fca_live_CmNgwhl9sgzQQA4ET1WHRxk7x7ZiT6UcBZyuyPjV&date=${params.date}&base_currency=${params.base_currency}&currencies=${params.currencies}`,
    );
    const exchangeRate = await response.json();
    return exchangeRate;
  }

  async getLatestExchangeRate(params: LatestExchangeRateQueryDto) {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CmNgwhl9sgzQQA4ET1WHRxk7x7ZiT6UcBZyuyPjV&base_currency=${params.base_currency}&currencies=${params.currencies}`,
    );
    const exchangeRate = await response.json();
    return exchangeRate;
  }
}
