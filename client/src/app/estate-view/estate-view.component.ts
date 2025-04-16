import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Estate, EstateService } from '../../api-services/estate.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { CurrencyFormatPipe } from "../../pipe/currency-format.pipe";

@Component({
  selector: 'app-estate-view',
  standalone: true,
  templateUrl: './estate-view.component.html',
  styleUrls: ['./estate-view.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    GoogleMapsModule,
    ImageViewerComponent,
    CurrencyFormatPipe
]
})
export class EstateViewComponent implements OnInit {
    markerPosition: google.maps.LatLngLiteral | null = null;
    zoom = 12;
    center: google.maps.LatLngLiteral = { lat: 50.4501, lng: 30.5234 };

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
    createdAt: '',
    soldAt: null,
    latitude: undefined,
    longitude: undefined
  };

  private estateService = inject(EstateService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEstate(+id);
    }
  }

  loadEstate(id: number): void {
    this.estateService.getEstate(id).subscribe({
      next: (data) => (this.handleData(data)),
      error: (err) => console.error('Error loading estate', err)
    });
  }

  getEstateType(type: number): string {
    switch (type) {
      case 1: return 'Apartment';
      case 2: return 'House';
      case 3: return 'Commercial';
      case 4: return 'Land';
      case 5: return 'Warehouse';
      case 6: return 'Garage';
      default: return 'Unknown';
    }
  }
  handleData(data: Estate): void {
    this.estate = data;
    this.center = {
      lat: data.latitude || 50.4501,
      lng: data.longitude || 30.5234 
    };

    if (data.latitude && data.longitude) {
        this.markerPosition = {
            lat: data.latitude,
            lng: data.longitude
          };
    }
  }
}
