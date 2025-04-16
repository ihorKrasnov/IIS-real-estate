// currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../external-api/currency-service';


@Pipe({
  name: 'currencyFormat',
  pure: false
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}

  transform(value: number | string): string {
    const amount = typeof value === 'string' ? parseFloat(value) : value;

    const currencyCode = localStorage.getItem('preferredCurrency') || '980';
    const currencyNum = this.getCurrencyNum(currencyCode);

    if (currencyNum === 980) {
      return `${this.formatPrice(amount)} ₴`;
    }

    const converted = this.currencyService.convertFromUAH(amount, currencyNum);
    const symbol = this.currencyService.getCurrencySymbol(currencyNum);

    return `${this.formatPrice(converted)} ${symbol}`;
  }

    private formatPrice(converted: number) {
        return new Intl.NumberFormat('uk-UA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(converted);
    }

  getCurrencyNum(code: string): number {
    return {
      'UAH': 980,
      'USD': 840,
      'EUR': 978
    }[code] ?? 980;
  }
}
