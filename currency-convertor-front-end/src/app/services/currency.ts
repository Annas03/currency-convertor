import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CurrencyResponse {
  [currencyCode: string]: string;
}

export interface ExchangeRateParams {
  date: string; // Format: YYYY-MM-DD
  base_currency: string;
  currencies: string;
}

export interface LatestExchangeRateParams {
  base_currency: string;
  currencies: string;
}

export interface ExchangeRateResponse {
  date: string;
  base: string;
  rates: {
    [currencyCode: string]: number;
  };
}

export interface UserHistory {
  base_currency: string;
  base_price: string;
  conversion_currency: string;
  conversion_price: number;
  historical_date?: string;
  exchange_rate: string;
}

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${this.apiUrl}`);
  }

  getHistoricalExchangeRate(params: ExchangeRateParams): Observable<ExchangeRateResponse> {
    const queryParams: any = {
      date: params.date,
    };

    if (params.base_currency) {
      queryParams.base_currency = params.base_currency;
    }

    if (params.currencies) {
      queryParams.currencies = params.currencies;
    }

    return this.http.get<ExchangeRateResponse>(`${this.apiUrl}exchange-rate`, {
      params: queryParams,
    });
  }

  geLatestExchangeRate(params: LatestExchangeRateParams): Observable<any> {
    const queryParams: any = {};

    if (params.base_currency) {
      queryParams.base_currency = params.base_currency;
    }

    if (params.currencies) {
      queryParams.currencies = params.currencies;
    }

    return this.http.get<ExchangeRateResponse>(`${this.apiUrl}latest-exchange-rate`, {
      params: queryParams,
    });
  }

  saveUserHistory(params: UserHistory): Observable<any> {
    const queryParams: any = {
      ...params,
    };

    !queryParams?.historical_date && delete queryParams.historical_date;

    return this.http.post<any>(`${this.apiUrl}history`, queryParams);
  }

  getUserHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}history`);
  }
}
