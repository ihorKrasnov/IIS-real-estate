// currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiUrl = 'https://api.monobank.ua/bank/currency';
  private rates: any = {};

  constructor(private http: HttpClient) {
    this.loadRates();
  }

  loadRates(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        this.rates = {};
        data.forEach(entry => {
          if (entry.currencyCodeB === 980 && entry.rateSell) {
            this.rates[entry.currencyCodeA] = entry.rateSell;
          }
        });
      }),
      catchError(err => {
        console.error('Error:', err);
        return of(null);
      })
    ).subscribe();
  }

  convertFromUAH(amount: number, toCurrencyCode: number): number {
    const rate = this.rates[toCurrencyCode];
    return rate ? amount / rate : amount;
  }

  getCurrencySymbol(code: number): string {
    return {
      980: '₴',
      840: '$',
      978: '€'
    }[code] ?? '';
  }
}
