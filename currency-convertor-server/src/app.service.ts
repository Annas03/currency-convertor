import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getCurrencies() {
    const currencies = await fetch(
      `https://api.freecurrencyapi.com/v1/currencies?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2`,
    );
    console.log(currencies);
    return currencies;
  }

  async getHistoricalExchangeRate(params) {
    const exchangeRate = await fetch(
      `https://api.freecurrencyapi.com/v1/historical?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2&date=2021-12-31`,
    );
    console.log(exchangeRate);
    return exchangeRate;
  }
}
