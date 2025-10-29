// book-cover.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookCoverService {
  private readonly COVERS_BASE_URL = 'https://covers.openlibrary.org/b';
  private readonly DEFAULT_COVER = 'assets/images/default-book-cover.jpg';

  constructor() { }

  // Método para obtener portada por ISBN
  getBookCover(isbn: string, size: 'S' | 'M' | 'L' = 'M'): string {
    return `${this.COVERS_BASE_URL}/isbn/${isbn}-${size}.jpg`;
  }

  // Método para obtener portada por OLID
  getWorkCover(olid: string, size: 'S' | 'M' | 'L' = 'M'): string {
    return `${this.COVERS_BASE_URL}/olid/${olid}-${size}.jpg`;
  }

  getDefaultCover(): string {
    return this.DEFAULT_COVER;
  }
}