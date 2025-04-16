import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface Estate {
  id: number;
  title: string;
  description: string;
  type: number; 
  price: number;
  area: number;
  address: string;
  city: string;
  region: string;
  isAvailable: boolean;
  images: Image[]; 
  createdAt: string;
  soldAt: string | null;
  latitude?: number,
  longitude?: number, 
}

export interface Image {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstateService extends BaseApiService {
  override controllerName: string = 'Estates'; 

  constructor(http: HttpClient) {
    super(http);
  }

  getEstates(): Observable<Estate[]> {
    return this.get<Estate[]>('');
  }

  getEstate(id: number): Observable<Estate> {
    return this.get<Estate>(`/${id}`);
  }

  createEstate(estate: Estate, files: File[]): Observable<Estate> {
    const formData = this.prepareFormData(estate, files);
    return this.post<Estate>('', formData);
  }

  updateEstate(estate: Estate, files: File[]): Observable<Estate> {
    const formData = this.prepareFormData(estate, files);
    return this.put<Estate>(`/${estate.id}`, formData);
  }

  deleteEstate(id: number): Observable<void> {
    return this.delete<void>(`/${id}`);
  }

  getEstatesMarkers(): Observable<EstateMarker[]> {
    return this.get<EstateMarker[]>('/markers');
  }

  private prepareFormData(estate: Estate, files: File[]): FormData {
    const formData = new FormData();

    const estateData = { ...estate };

    formData.append('estate', JSON.stringify(estateData));

    files.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    return formData;
  }
}

export interface EstateMarker {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  price: number;
}
