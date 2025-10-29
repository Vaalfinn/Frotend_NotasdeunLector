
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisitanteComponent } from '../../auth/modal-visitante/modal-visitante.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  image: string;
  featured?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredBooks: Book[] = [];
  currentSlide = 0;
  books: Book[] = [
    {
      id: 1,
      title: 'El nombre del viento',
      author: 'Patrick Rothfuss',
      genre: 'fantasia',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/91PjnllfsxL._UF894,1000_QL80_.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Orgullo y prejuicio',
      author: 'Jane Austen',
      genre: 'romance',
      rating: 4.6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYx4D-fA7ukGhl0VTV9wvLy3hNX0kTsiaMoIoMTR5C3wlxBOwwWBMtuTpRfQv8sM0ckX8&usqp=CAU',
      featured: true
    },

    {
      id: 3,
      title: 'Alemdra',
      author: 'Wo Pyung Sohn',
      genre: 'thriller',
      rating: 4.6,
      image: 'https://0.academia-photos.com/attachment_thumbnails/64575607/mini_magick20201001-2897-s0dewo.png?1601579887',
      featured: true
    },
    {
      id: 4,
      title: 'La Metamorfosis',
      author: 'Franz Kafka',
      genre: 'fantacia',
      rating: 4.6,
      image: 'https://gandhi.vtexassets.com/arquivos/ids/4625361/9788468341194.jpg?v=638575286534900000',
      featured: true
    },
    {
      id: 5,
      title: 'Alas de Sangre',
      author: 'Rebecca Yarros',
      genre: 'ciencia ficcion',
      rating: 4.2,
      image: 'https://udocz-images.b-cdn.net/documents_html/665973-717e037bc49e56e383611955e106d9b3/bg1.jpg?width=2688&height=4032',
      featured: true
    },
    {
      id: 6,
      title: 'El Proceso',
      author: 'Franz Kafka',
      genre: 'fantacia',
      rating: 5.0,
      image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/68/80/6880ee206baf079c74d5e70ef32ff560.jpg',
      featured: true
    },
    {
      id: 7,
      title: 'El Principito',
      author: 'Franz Kafka',
      genre: 'clasicos',
      rating: 4.9,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrMg3qM1Jv28y6PvKRnsoITTVNNm8hDBFmw&s=10',
      featured: true
    },

  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.featuredBooks = this.books.filter(b => b.featured);
    console.log('Home cargando'); //verrificar si esto se imprime
    const role = this.authService.getUserRole();// recuperar el rol desde el token
    console.log('Rol detectado:', role); //ESTO MUESTRA EL ROL EN LA CONSOLA
    if (role === 'INVITADO') {
      this.dialog.open(ModalVisitanteComponent, {
        width: '350px',
        disableClose: true
      });
    }
    this.initCarousel();
  }

  navigateToBooks() {
    this.router.navigate(['/novedades']);

    // Aquí puedes poner la lógica de navegación, por ejemplo:
    // this.router.navigate(['/mibiblioteca']);
    console.log('Navegando a libros');
  }

  initCarousel() {
    // Inicializar carrusel
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const books = document.querySelectorAll('.carousel-book');
    if (this.currentSlide < this.books.filter(b => b.featured).length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    if (track) track.style.transform = `translateX(-${this.currentSlide * 240}px)`;
  }

  prevSlide() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    if (this.currentSlide > 0) {
      this.currentSlide--;
      if (track) track.style.transform = `translateX(-${this.currentSlide * 240}px)`;
    }
  }

  filterBooks(genre: string) {
    // Lógica para filtrar libros
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    (event?.target as HTMLElement)?.classList.add('active');
    // Aquí implementarías la lógica de filtrado real
    console.log(`Filtrando por: ${genre}`);
  }
}
