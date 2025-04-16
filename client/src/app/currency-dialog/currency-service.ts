import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>(
    localStorage.getItem('preferredCurrency') || 'USD'
  );

  currency$ = this.currencySubject.asObservable();

  setCurrency(currency: string) {
    localStorage.setItem('preferredCurrency', currency);
    this.currencySubject.next(currency);
  }

  getCurrency(): string {
    return this.currencySubject.value;
  }
}
