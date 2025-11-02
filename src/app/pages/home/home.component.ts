
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisitanteComponent } from '../../auth/modal-visitante/modal-visitante.component';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  featuredBooks: Book[] = [];
  currentSlide = 0;
  @ViewChild('carousel', { static: false }) carousel?: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

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
      title: 'Alemendra',
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
      rating: 5,
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
    // Inicializar carrusel (autoscroll opcional)
    // Puedes activar esto si quieres que avance solo cada X ms
    // setInterval(() => this.nextSlide(), 5000);
  }
  nextSlide() {
    if (!this.carousel) return;
    const el = this.carousel.nativeElement;
    const card = el.querySelector('.carousel-card') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 16;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }

  prevSlide() {
    if (!this.carousel) return;
    const el = this.carousel.nativeElement;
    const card = el.querySelector('.carousel-card') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 16;
    el.scrollBy({ left: -step, behavior: 'smooth' });
  }

  filterBooks(genre: string, ev?: Event) {
    // Lógica para filtrar libros (marcar botón activo)
    const buttons = document.querySelectorAll('.filter-btn');
    for (const btn of Array.from(buttons)) {
      (btn as HTMLElement).classList.remove('active');
    }
    if (ev?.target) (ev.target as HTMLElement).classList.add('active');
    console.log(`Filtrando por: ${genre}`);
  }
  segmentChanged(event: any) {
    const genre = event.detail.value;
    console.log('Género seleccionado:', genre);
  }
}
