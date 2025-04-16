import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Estate, EstateService } from '../../api-services/estate.service';
import { CurrencyFormatPipe } from "../../pipe/currency-format.pipe";

@Component({
  selector: 'app-estate-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, CurrencyFormatPipe],
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {
  estates: Estate[] = [];
  private estateService = inject(EstateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadEstates();
  }

  loadEstates(): void {
    this.estateService.getEstates().subscribe(
      (data) => {
        this.estates = data;
      },
      (error) => {
        console.error('Error loading estates', error);
      }
    );
  }

  createEstate(): void {
    this.router.navigate(['/create-estate']);
  }

  editEstate(id: number): void {
    this.router.navigate([`/create-estate/${id}`]);
  }

  deleteEstate(id: number): void {
    if (confirm('Are you sure you want to delete this estate?')) {
      this.estateService.deleteEstate(id).subscribe(
        () => {
          this.estates = this.estates.filter(estate => estate.id !== id);
        },
        (error) => {
          console.error('Error deleting estate', error);
        }
      );
    }
  }

  viewEstate(id: number) {
    this.router.navigate([`/view-estate/${id}`]);
  }
}
