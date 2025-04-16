import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker as GMapMarker, GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { EstateService } from '../../api-services/estate.service';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from "../../pipe/currency-format.pipe";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    CurrencyFormatPipe
],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.4501, lng: 30.5234 };
  markers: CustomMapMarker[] = [];

  selectedMarker: CustomMapMarker | null = null;

  mapOptions: google.maps.MapOptions = {};

  private estateService = inject(EstateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.estateService.getEstatesMarkers().subscribe((markers) => {
      this.markers = markers.map(marker => ({
        lat: marker.latitude ?? 0,
        lng: marker.longitude ?? 0,
        label: marker.title,
        id: marker.id.toString(),
        title: marker.title,
        price: marker.price
      }));
    });
  }

  openInfo(marker: CustomMapMarker, mapMarker: GMapMarker) {
    this.selectedMarker = marker;
    this.infoWindow.open(mapMarker);
  }

  goToEstate(marker: CustomMapMarker) {
    this.router.navigate(['/view-estate', marker.id]);
  }
}

export interface CustomMapMarker {
  lat: number;
  lng: number;
  label?: string;
  id?: string;
  title?: string;
  price?: number;
}
