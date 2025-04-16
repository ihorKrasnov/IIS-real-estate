import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-map-picker-dialog',
  templateUrl: './map-picker-dialog.component.html',
  styleUrls: ['./map-picker-dialog.scss'],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatButtonModule,
]
})
export class MapPickerDialogComponent {
  markerPosition: google.maps.LatLngLiteral | null = null;
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 50.4501, lng: 30.5234 }; // Київ

  constructor(
    public dialogRef: MatDialogRef<MapPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  mapClicked(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }

  confirm() {
    this.dialogRef.close(this.markerPosition);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
