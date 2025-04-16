import { Component, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CurrencyService } from "./currency-service";

@Component({
  standalone: true,
  selector: 'app-currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrls: ['./currency-dialog.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class CurrencyDialogComponent {
  selectedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
  currencies = ['USD', 'EUR', 'UAH'];

  private dialogRef = inject(MatDialogRef<CurrencyDialogComponent>);
  constructor(private currencyService: CurrencyService) {}

  saveCurrency() {
    this.currencyService.setCurrency(this.selectedCurrency);
  }
  
  save(): void {
    this.saveCurrency();
    this.dialogRef.close(this.selectedCurrency);
  }

  close(): void {
    this.dialogRef.close();
  }
}
