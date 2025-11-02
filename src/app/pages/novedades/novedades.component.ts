import { Component, OnInit } from '@angular/core';
import { BookCoverService } from '../../services/book-cover.service';

@Component({
  selector: 'app-novedades',
  standalone: false,
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  // Lista completa de libros con ISBNs
  allBooks: any[] = [
    // Fantasía
    { title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', genre: 'fantasia', isbn: '9788445000667', olid: 'OL27448W', rating: 4.8, image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660300323-51jEgUL27CL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980' },
    { title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasia', isbn: '9780345339683', olid: 'OL7492609M', rating: 4.7 },
    { title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling', genre: 'fantasia', isbn: '9788478884456', olid: 'OL82586W', rating: 4.8, image: 'https://i.pinimg.com/1200x/ee/23/df/ee23df3a67f6f27ab8645debc9f6d5e3.jpg' },
    { title: 'Juego de Tronos', author: 'George R.R. Martin', genre: 'fantasia', isbn: '9788401352837', olid: 'OL262099W', rating: 4.6, imagen: 'https://i.pinimg.com/736x/79/24/35/7924358c350d8239648bfd42f72626ef.jpg' },
    { title: 'El nombre del viento', author: 'Patrick Rothfuss', genre: 'fantasia', isbn: '9788401337209', olid: 'OL23682213W', rating: 4.5, image: 'https://i.pinimg.com/736x/76/e5/43/76e543500a7625623002c13ad3545421.jpg' },
    { title: 'Cazadores de sombras: Ciudad de hueso', author: 'Cassandra Clare', genre: 'fantasia', isbn: '9788426403859', olid: 'OL24027118W', rating: 4.3, image: 'https://i.pinimg.com/736x/51/61/ac/5161ac4fb7d6ba16bf67cb0893224aff.jpg' },
    // Romance
    { title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'romance', isbn: '9788497940179', olid: 'OL349749W', rating: 4.5, image: 'https://i.pinimg.com/1200x/fb/ab/17/fbab17af6b9aa62f1b41e85125c0cfb7.jpg' },
    { title: 'Bajo la misma estrella', author: 'John Green', genre: 'romance', isbn: '9788426416743', olid: 'OL25790218W', rating: 4.2, image: 'https://i.pinimg.com/736x/f9/c5/c4/f9c5c4e98e0811b2bd65ffaedae0de27.jpg' },
    { title: 'Yo antes de ti', author: 'Jojo Moyes', genre: 'romance', isbn: '9788426408489', olid: 'OL26135845W', rating: 4.4, image: 'https://i.pinimg.com/736x/ca/c6/34/cac634f47115c961ada498d3a71f907f.jpg' },
    { title: 'Emma', author: 'Jane Austen', genre: 'romance', isbn: '9788497940186', olid: 'OL349748W', rating: 4.3, image: 'https://i.pinimg.com/736x/54/f0/8e/54f08e96c945137dc81df58472ad3e3e.jpg' },
    { title: 'Eleanor & Park', author: 'Rainbow Rowell', genre: 'romance', isbn: '9788426403866', olid: 'OL25790217W', rating: 4.1, image: 'https://i.pinimg.com/736x/07/f6/be/07f6be051f9432071c307554fad8bdfa.jpg' },
    { title: 'El diario de Noah', author: 'Nicholas Sparks', genre: 'romance', isbn: '9788497592408', olid: 'OL892011W', rating: 4.0, image: 'https://i.pinimg.com/1200x/6d/17/e6/6d17e63a76e5d674b72e3e46d8b31984.jpg' },

    // Thriller
    { title: 'El silencio de los corderos', author: 'Thomas Harris', genre: 'thriller', isbn: '9788497594258', olid: 'OL892010W', rating: 4.6, image: 'https://i.pinimg.com/736x/60/70/76/607076cba6d21254afd9bc5ebe4cd782.jpg' },
    { title: 'La chica del tren', author: 'Paula Hawkins', genre: 'thriller', isbn: '9788426408472', olid: 'OL25790216W', rating: 4.1, image: 'https://i.pinimg.com/736x/0e/03/62/0e03628b7bd6a56dd4bc7cafb56eb631.jpg' },
    { title: 'Gone Girl', author: 'Gillian Flynn', genre: 'thriller', isbn: '9788426403866', olid: 'OL25790215W', rating: 4.3, image: 'https://i.pinimg.com/1200x/1e/08/6b/1e086b92ba8c65a712ab3fa9ee1b52fc.jpg' },
    { title: 'El código Da Vinci', author: 'Dan Brown', genre: 'thriller', isbn: '9788408056194', olid: 'OL892009W', rating: 4.0, image: 'https://i.pinimg.com/1200x/35/54/91/355491e1e2b2df931a44458f8e192c4a.jpg' },
    { title: 'El psicoanalista', author: 'John Katzenbach', genre: 'thriller', isbn: '9788497593887', olid: 'OL892008W', rating: 4.2, image: 'https://i.pinimg.com/736x/db/3b/2f/db3b2fecb979db3cae3ae97b36fdff02.jpg' },

    // Ciencia Ficción
    { title: 'Dune', author: 'Frank Herbert', genre: 'ciencia-ficcion', isbn: '9788445003385', olid: 'OL893520W', rating: 4.5, image: 'https://i.pinimg.com/736x/34/d2/79/34d279c51a4a9275f2d3003ee782e756.jpg' },
    { title: '1984', author: 'George Orwell', genre: 'ciencia-ficcion', isbn: '9788499890944', olid: 'OL349746W', rating: 4.6, image: 'https://i.pinimg.com/736x/07/f3/20/07f320b3eb404690104fea5c9a42c69e.jpg' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'ciencia-ficcion', isbn: '9788445074873', olid: 'OL349745W', rating: 4.4, image: 'https://i.pinimg.com/736x/62/65/fd/6265fdd009fbdfd25fd343a4d440a213.jpg' },
    { title: 'El juego de Ender', author: 'Orson Scott Card', genre: 'ciencia-ficcion', isbn: '9788413140731', olid: 'OL892007W', rating: 4.3, image: 'https://i.pinimg.com/736x/f0/4c/78/f04c7835cfafabf027825c2e05e39440.jpg' },
    { title: 'Ready Player One', author: 'Ernest Cline', genre: 'ciencia-ficcion', isbn: '9788401357382', olid: 'OL25790214W', rating: 4.2, image: 'https://i.pinimg.com/1200x/fe/09/33/fe093324483eb0be3e3f2de19744f5df.jpg' },

    // Clásicos
    { title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'clasicos', isbn: '9780307474728', olid: 'OL892006W', rating: 4.7, iamge: 'https://i.pinimg.com/1200x/31/76/cb/3176cbc903f64f532ce75240f96a202e.jpg' },
    { title: 'Matar a un ruiseñor', author: 'Harper Lee', genre: 'clasicos', isbn: '9788420674209', olid: 'OL349744W', rating: 4.6, image: 'https://i.pinimg.com/736x/1f/87/ca/1f87cab8f073d380c089129dc188fbe0.jpg' },
    { title: 'Moby Dick', author: 'Herman Melville', genre: 'clasicos', isbn: '9788497940469', olid: 'OL349743W', rating: 4.2, image: 'https://i.pinimg.com/736x/2d/cb/87/2dcb875e2295700b2bd0d3f77af03a13.jpg' },
    { title: 'Crimen y castigo', author: 'Fiódor Dostoyevski', genre: 'clasicos', isbn: '9788420674209', olid: 'OL349742W', rating: 4.5, image: 'https://i.pinimg.com/1200x/98/84/bd/9884bd66eb2d9d4f7c5b75c7912614ee.jpg' },
    { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'clasicos', isbn: '9788467033264', olid: 'OL349741W', rating: 4.3, image: 'https://i.pinimg.com/736x/0e/f5/ce/0ef5ce43c3ea4609e6d789279e05b23b.jpg' },
    { title: 'Pedro Paramo', author: 'Juan Rulfo', genre: 'clasicos', isbn: '9788467033264', olid: 'OL349741W', rating: 4.3, image: 'https://i.pinimg.com/1200x/de/96/b2/de96b22b8e7bd8c0d5184ba030b61764.jpg' }
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

  // Maneja la búsqueda desde el ion-searchbar
  handleSearch(event: any): void {
    const val = event?.detail?.value ?? event?.target?.value ?? '';
    const term = (val || '').toString().trim().toLowerCase();

    if (!term) {
      // Si no hay término, volver a aplicar el filtro por género actual
      this.filteredBooks = this.selectedGenre === 'all'
        ? [...this.allBooks]
        : this.allBooks.filter(book => book.genre === this.selectedGenre);
      return;
    }

    this.filteredBooks = this.allBooks.filter(book => {
      const matchesTerm = (book.title || '').toString().toLowerCase().includes(term)
        || (book.author || '').toString().toLowerCase().includes(term);
      const matchesGenre = this.selectedGenre === 'all' || book.genre === this.selectedGenre;
      return matchesTerm && matchesGenre;
    });
  }

  // Maneja errores de carga de imágenes
  handleImageError(book: any): void {
    book.image = this.bookCoverService.getDefaultCover();
  }
  getDefaultCover(): string {
    return 'assets/images/default-book-cover.jpg';
  }
}