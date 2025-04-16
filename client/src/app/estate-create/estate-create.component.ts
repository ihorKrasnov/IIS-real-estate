import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estate, EstateService } from '../../api-services/estate.service';
import { MatDialog } from '@angular/material/dialog';
import { MapPickerDialogComponent } from '../map-picker/map-picker-dialog.component';

@Component({
  selector: 'app-estate-create',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
],
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss']
})
export class EstateCreateComponent implements OnInit {
  estate: Estate = {
    id: 0,
    title: '',
    description: '',
    type: 1,
    price: 0,
    area: 0,
    address: '',
    city: '',
    region: '',
    isAvailable: true,
    images: [],
    createdAt: new Date().toISOString(),
    soldAt: null,
  };

  selectedImages: File[] = [];
  isEditMode: boolean = false; 
  private estateService = inject(EstateService);
  public router = inject(Router);
  public dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const estateId = this.activatedRoute.snapshot.paramMap.get('id');
    if (estateId) {
      this.isEditMode = true;
      this.loadEstate(+estateId);
    }
  }

  loadEstate(id: number): void {
    this.estateService.getEstate(id).subscribe(
      (estateData) => {
        this.estate = estateData;
      },
      (error) => {
        console.error('Error loading estate', error);
      }
    );
  }

  saveEstate(): void {
    if (this.isEditMode) {
      this.updateEstate();
    } else {
      this.createEstate();
    }
  }

  createEstate(): void {
    this.estateService.createEstate(this.estate, this.selectedImages).subscribe(
      (newEstate) => {
        this.router.navigate(['/estates']);
      },
      (error) => {
        console.error('Error creating estate', error);
      }
    );
  }

  updateEstate(): void {
    this.estateService.updateEstate(this.estate, this.selectedImages).subscribe(
      (updatedEstate) => {
        this.router.navigate(['/estates']);
      },
      (error) => {
        console.error('Error updating estate', error);
      }
    );
  }

  selectLocationOnMap(): void {
    const dialogRef = this.dialog.open(MapPickerDialogComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estate.latitude = result.lat;
        this.estate.longitude = result.lng;
      }
    });
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);
      console.log('Selected images:', this.selectedImages);
    }
  }  
}
