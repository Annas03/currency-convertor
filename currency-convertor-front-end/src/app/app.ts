import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Currency, UserHistory } from './services/currency';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App {
  constructor(private fb: FormBuilder, private currencyService: Currency) {}
  protected readonly title = signal('currency-convertor-front-end');
  convertorForm: FormGroup = new FormGroup({});
  currenciesData: any[] = [];
  loader: boolean = false;
  userHistory: any[] = [];
  userHistoryLoader: boolean = false;
  exchangeValue: number = 0;
  maxDate: string = new Date().toISOString().split('T')[0];

  ngOnInit() {
    this.initializeForm();
    this.fetchCurrenciesData();
    this.fetchUserHistory();
  }

  fetchCurrenciesData() {
    this.currencyService.getCurrencies().subscribe({
      next: (response: any) => {
        this.currenciesData = Object.values(response.data);
      },
    });
  }

  fetchUserHistory() {
    this.userHistoryLoader = true;
    this.currencyService.getUserHistory().subscribe({
      next: (response: any) => {
        this.userHistory = response;
        this.userHistoryLoader = false;
      },
      error: () => {
        this.userHistoryLoader = false;
      },
    });
  }

  initializeForm() {
    this.convertorForm = this.fb.group({
      basePrice: new FormControl(0, [
        Validators.min(1),
        Validators.required,
        this.notNullValidator,
      ]),
      baseCurrency: new FormControl('USD'),
      convertPrice: new FormControl({ value: 0, disabled: true }),
      convertCurrency: new FormControl('EUR'),
      historicalDate: new FormControl('', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    });
  }

  notNullValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value === null) {
      return { isNull: true };
    }
    return null;
  }

  saveUserHistory(saveUserParams: UserHistory) {
    this.currencyService.saveUserHistory(saveUserParams).subscribe({
      next: (response) => {
        this.userHistory = [response, ...this.userHistory];
        this.loader = false;
        this.userHistoryLoader = false;
      },
      error: () => {
        this.loader = false;
        this.userHistoryLoader = false;
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  convert() {
    this.loader = true;
    this.userHistoryLoader = true;
    const formValues: any = this.convertorForm.value;

    if (formValues.historicalDate) {
      const params = {
        date: formValues.historicalDate,
        base_currency: formValues.baseCurrency,
        currencies: formValues.convertCurrency,
      };
      this.currencyService.getHistoricalExchangeRate(params).subscribe({
        next: (response: any) => {
          const exchangeRate = response.data;
          this.exchangeValue =
            exchangeRate[formValues.historicalDate][formValues.convertCurrency].toFixed(2);
          const convertedValue = (
            exchangeRate[formValues.historicalDate][formValues.convertCurrency] *
            formValues.basePrice
          ).toFixed(2);
          this.convertorForm.get('convertPrice')?.setValue(convertedValue);
          this.saveUserHistory({
            base_currency: formValues.baseCurrency,
            base_price: formValues.basePrice,
            historical_date: formValues.historicalDate,
            conversion_currency: formValues.convertCurrency,
            conversion_price:
              exchangeRate[formValues.historicalDate][formValues.convertCurrency] *
              formValues.basePrice,
            exchange_rate: exchangeRate[formValues.historicalDate][formValues.convertCurrency],
          });
        },
        error: () => {
          this.loader = false;
          this.userHistoryLoader = false;
        },
      });
    } else {
      const params = {
        base_currency: formValues.baseCurrency,
        currencies: formValues.convertCurrency,
      };
      this.currencyService.geLatestExchangeRate(params).subscribe({
        next: (response: any) => {
          const exchangeRate = response.data;
          this.exchangeValue = exchangeRate[formValues.convertCurrency].toFixed(2);
          const convertedValue = (
            exchangeRate[formValues.convertCurrency] * formValues.basePrice
          ).toFixed(2);
          this.convertorForm.get('convertPrice')?.setValue(convertedValue);
          this.saveUserHistory({
            base_currency: formValues.baseCurrency,
            base_price: formValues.basePrice,
            conversion_currency: formValues.convertCurrency,
            conversion_price: exchangeRate[formValues.convertCurrency] * formValues.basePrice,
            exchange_rate: exchangeRate[formValues.convertCurrency],
          });
        },
        error: () => {
          this.loader = false;
        },
      });
    }
  }
}
