import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Image } from '../../api-services/estate.service';


@Component({
  standalone: true,
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.scss'],
  imports: [
    CommonModule,
  ]
})
export class ImageViewerComponent {
  @Input() images: Image[] = [];
  currentImageIndex: number = 0;

  // Функція для переходу до наступного зображення
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  // Функція для переходу до попереднього зображення
  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  // Функція для зміни активного зображення по кліку на мініатюру
  setActiveImage(index: number) {
    this.currentImageIndex = index;
  }

  getImgUrl(currentImageIndex: number) {
    const baseUrl = 'https://localhost:7208/';
    return baseUrl + this.images[currentImageIndex]?.url?.replaceAll('\\', '/');
}
}
