import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  portada?: string;
}

interface Comentario {
  id: number;
  libroId: number;
  libroTitulo: string;
  texto: string;
  calificacion: number;
  usuarioNombre: string;
  fecha: Date;
  esNotaPrivada?: boolean;
}

@Component({
  selector: 'app-mibiblioteca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mibiblioteca.component.html',
  styleUrls: ['./mibiblioteca.component.css']
})
export class MibibliotecaComponent implements OnInit {
  // Datos para el formulario
  libroSeleccionado: number = 0;
  nuevoComentario: string = '';
  calificacion: number = 0;
  esNotaPrivada: boolean = false;
  mostrarSoloNotas: boolean = false;

  // Filtros para comentarios
  filtroBusqueda: string = '';
  filtroCalificacion: number = 0;

  // Lista de libros del usuario
  misLibros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: '1984', autor: 'George Orwell' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry' },
    { id: 4, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen' },
    { id: 5, titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald' },
    { id: 6, titulo: 'El código Da Vinci', autor: 'Dan Brown' },
    { id: 7, titulo: 'El alquimista', autor: 'Paulo Coelho' },
    { id: 8, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón' },
    { id: 9, titulo: 'El nombre de la rosa', autor: 'Umberto Eco' },
    { id: 10, titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel García Márquez' },
    { id: 11, titulo: 'Rayuela', autor: 'Julio Cortázar' },
    { id: 12, titulo: 'El túnel', autor: 'Ernesto Sabato' },
    { id: 13, titulo: 'Ficciones', autor: 'Jorge Luis Borges' },
    { id: 14, titulo: 'La casa de los espíritus', autor: 'Isabel Allende' },
    { id: 15, titulo: 'Los detectives salvajes', autor: 'Roberto Bolaño' }
  ];

  // Comentarios guardados
  comentariosGuardados: Comentario[] = [
    {
      id: 1,
      libroId: 1,
      libroTitulo: 'Cien años de soledad',
      texto: 'Un libro fascinante que narra la historia de la familia Buendía.',
      calificacion: 5,
      usuarioNombre: 'Valeria Flores Martínez',
      fecha: new Date('2025-8-09'),
      esNotaPrivada: false
    },
    {
      id: 2,
      libroId: 2,
      libroTitulo: '1984',
      texto: 'Una obra maestra de la distopía moderna.',
      calificacion: 4,
      usuarioNombre: 'Valeria Flores Martínez',
      fecha: new Date('2025-08-10'),
      esNotaPrivada: true
    }
  ];

  // Libros favoritos
  librosFavoritos: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', portada: 'https://images.cdn1.buscalibre.com/fit-in/360x360/0e/c7/0ec741b8d2d93e9a2355cc1410f0825b.jpg' },
    { id: 2, titulo: '1984', autor: 'George Orwell', portada: 'https://m.media-amazon.com/images/I/61HkdyBpKOL._UF894,1000_QL80_.jpg' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', portada: 'https://gandhi.vtexassets.com/arquivos/ids/4368502/9786078678006.jpg?v=638448228656200000' },
    { id: 4, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', portada: 'https://images.cdn3.buscalibre.com/fit-in/360x360/49/6c/496cc2d26070c4f19d7f8e93a09274ac.jpg' },
    { id: 5, titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', portada: 'https://cms.anagrama-ed.es/uploads/media/portadas/0001/15/b2834bc4ea71357c8b549dfccdd16d611c6586ea.jpeg' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.cargarDatosGuardados();
  }

  cargarDatosGuardados(): void {
    const guardados = localStorage.getItem('bibliotecaComentarios');
    if (guardados) {
      this.comentariosGuardados = JSON.parse(guardados);
    }
  }

  guardarDatos(): void {
    localStorage.setItem('bibliotecaComentarios', JSON.stringify(this.comentariosGuardados));
  }

  get comentariosFiltrados(): Comentario[] {
    return this.comentariosGuardados.filter((comentario: Comentario) => {
      const cumpleBusqueda = this.filtroBusqueda === '' ||
        comentario.libroTitulo.toLowerCase().includes(this.filtroBusqueda.toLowerCase());

      const cumpleCalificacion = this.filtroCalificacion === 0 ||
        comentario.calificacion === this.filtroCalificacion;

      const cumpleTipo = !this.mostrarSoloNotas || (comentario.esNotaPrivada === true);

      return cumpleBusqueda && cumpleCalificacion && cumpleTipo;
    }).sort((a: Comentario, b: Comentario) => b.fecha.getTime() - a.fecha.getTime());
  }

  agregarComentario(): void {
    if (!this.libroSeleccionado || !this.nuevoComentario || this.calificacion === 0) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const libro = this.misLibros.find(l => l.id === this.libroSeleccionado);

    if (libro) {
      const nuevoComentario: Comentario = {
        id: Date.now(),
        libroId: this.libroSeleccionado,
        libroTitulo: libro.titulo,
        texto: this.nuevoComentario,
        calificacion: this.calificacion,
        usuarioNombre: 'Tú',
        fecha: new Date(),
        esNotaPrivada: this.esNotaPrivada
      };

      this.comentariosGuardados.unshift(nuevoComentario);
      this.guardarDatos();

      // Reiniciar formulario
      this.nuevoComentario = '';
      this.calificacion = 0;
      this.esNotaPrivada = false;

      alert(this.esNotaPrivada ? 'Nota guardada correctamente' : 'Comentario guardado correctamente');
    }
  }

  verDetalles(libroId: number): void {
    console.log('Ver detalles del libro:', libroId);
  }

  quitarFavorito(libroId: number): void {
    this.librosFavoritos = this.librosFavoritos.filter(libro => libro.id !== libroId);
  }
}