import { Component, OnInit } from '@angular/core';
import { BookCoverService } from '../../services/book-cover.service';

@Component({
  selector: 'app-novedades',
  standalone: false,
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent implements OnInit {
  // Lista completa de libros con ISBNs
  allBooks: any[] = [
    // Fantasía
    { title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', genre: 'fantasia', isbn: '9788445000667', olid: 'OL27448W', rating: 4.8, image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660300323-51jEgUL27CL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980' },
    { title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasia', isbn: '9780345339683', olid: 'OL7492609M', rating: 4.7 },
    { title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling', genre: 'fantasia', isbn: '9788478884456', olid: 'OL82586W', rating: 4.8 },
    { title: 'Juego de Tronos', author: 'George R.R. Martin', genre: 'fantasia', isbn: '9788401352837', olid: 'OL262099W', rating: 4.6 },
    { title: 'El nombre del viento', author: 'Patrick Rothfuss', genre: 'fantasia', isbn: '9788401337209', olid: 'OL23682213W', rating: 4.5 },
    { title: 'Cazadores de sombras: Ciudad de hueso', author: 'Cassandra Clare', genre: 'fantasia', isbn: '9788426403859', olid: 'OL24027118W', rating: 4.3 },

    // Romance
    { title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'romance', isbn: '9788497940179', olid: 'OL349749W', rating: 4.5 },
    { title: 'Bajo la misma estrella', author: 'John Green', genre: 'romance', isbn: '9788426416743', olid: 'OL25790218W', rating: 4.2 },
    { title: 'Yo antes de ti', author: 'Jojo Moyes', genre: 'romance', isbn: '9788426408489', olid: 'OL26135845W', rating: 4.4 },
    { title: 'Emma', author: 'Jane Austen', genre: 'romance', isbn: '9788497940186', olid: 'OL349748W', rating: 4.3 },
    { title: 'Eleanor & Park', author: 'Rainbow Rowell', genre: 'romance', isbn: '9788426403866', olid: 'OL25790217W', rating: 4.1 },
    { title: 'El diario de Noah', author: 'Nicholas Sparks', genre: 'romance', isbn: '9788497592408', olid: 'OL892011W', rating: 4.0 },

    // Thriller
    { title: 'El silencio de los corderos', author: 'Thomas Harris', genre: 'thriller', isbn: '9788497594258', olid: 'OL892010W', rating: 4.6 },
    { title: 'La chica del tren', author: 'Paula Hawkins', genre: 'thriller', isbn: '9788426408472', olid: 'OL25790216W', rating: 4.1 },
    { title: 'Gone Girl', author: 'Gillian Flynn', genre: 'thriller', isbn: '9788426403866', olid: 'OL25790215W', rating: 4.3 },
    { title: 'El código Da Vinci', author: 'Dan Brown', genre: 'thriller', isbn: '9788408056194', olid: 'OL892009W', rating: 4.0 },
    { title: 'El psicoanalista', author: 'John Katzenbach', genre: 'thriller', isbn: '9788497593887', olid: 'OL892008W', rating: 4.2 },

    // Ciencia Ficción
    { title: 'Dune', author: 'Frank Herbert', genre: 'ciencia-ficcion', isbn: '9788445003385', olid: 'OL893520W', rating: 4.5 },
    { title: '1984', author: 'George Orwell', genre: 'ciencia-ficcion', isbn: '9788499890944', olid: 'OL349746W', rating: 4.6 },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'ciencia-ficcion', isbn: '9788445074873', olid: 'OL349745W', rating: 4.4 },
    { title: 'El juego de Ender', author: 'Orson Scott Card', genre: 'ciencia-ficcion', isbn: '9788413140731', olid: 'OL892007W', rating: 4.3 },
    { title: 'Ready Player One', author: 'Ernest Cline', genre: 'ciencia-ficcion', isbn: '9788401357382', olid: 'OL25790214W', rating: 4.2 },

    // Clásicos
    { title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'clasicos', isbn: '9780307474728', olid: 'OL892006W', rating: 4.7 },
    { title: 'Matar a un ruiseñor', author: 'Harper Lee', genre: 'clasicos', isbn: '9788420674209', olid: 'OL349744W', rating: 4.6 },
    { title: 'Moby Dick', author: 'Herman Melville', genre: 'clasicos', isbn: '9788497940469', olid: 'OL349743W', rating: 4.2 },
    { title: 'Crimen y castigo', author: 'Fiódor Dostoyevski', genre: 'clasicos', isbn: '9788420674209', olid: 'OL349742W', rating: 4.5 },
    { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'clasicos', isbn: '9788467033264', olid: 'OL349741W', rating: 4.3 }
  ];

  // Lista filtrada que se mostrará
  filteredBooks: any[] = [];

  // Género seleccionado
  selectedGenre: string = 'all';

  constructor(private bookCoverService: BookCoverService) { }

  ngOnInit(): void {
    this.loadBookCovers();
  }

  loadBookCovers(): void {
    this.allBooks.forEach(book => {
      // Prioriza imagen manual si existe, sino usa API
      if (!book.image) {
        book.image = book.olid
          ? this.bookCoverService.getWorkCover(book.olid)
          : this.bookCoverService.getBookCover(book.isbn);
      }
    });
    this.filteredBooks = [...this.allBooks];
  }


  // Método para filtrar por género
  filterByGenre(genre: string): void {
    this.selectedGenre = genre;
    this.filteredBooks = genre === 'all'
      ? [...this.allBooks]
      : this.allBooks.filter(book => book.genre === genre);
  }

  // Maneja errores de carga de imágenes
  handleImageError(book: any): void {
    book.image = this.bookCoverService.getDefaultCover();
  }
  getDefaultCover(): string {
    return 'assets/images/default-book-cover.jpg';
  }
}