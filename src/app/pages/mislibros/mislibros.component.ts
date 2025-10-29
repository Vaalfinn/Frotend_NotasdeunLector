import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comentario {
  nombre: string;
  texto: string;
  valoracion: number;
  fecha: Date;
  avatar?: string;
}

@Component({
  selector: 'app-mislibros',
  imports: [CommonModule, FormsModule],
  templateUrl: './mislibros.component.html',
  styleUrls: ['./mislibros.component.css']
})
export class MislibrosComponent implements OnInit {
  nuevoComentario: Comentario = {
    nombre: '',
    texto: '',
    valoracion: 0,
    fecha: new Date()
  };

  comentarios: Comentario[] = [

  ];

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    const guardados = localStorage.getItem('libroComentarios');
    if (guardados) {
      this.comentarios = JSON.parse(guardados);
    }
  }

  guardarComentarios(): void {
    localStorage.setItem('libroComentarios', JSON.stringify(this.comentarios));
  }

  agregarComentario(): void {
    if (!this.nuevoComentario.nombre || !this.nuevoComentario.texto || !this.nuevoComentario.valoracion) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Asignar fecha actual
    this.nuevoComentario.fecha = new Date();

    // Agregar a la lista
    this.comentarios.unshift({ ...this.nuevoComentario });

    // Guardar en localStorage
    this.guardarComentarios();

    // Resetear formulario
    this.nuevoComentario = {
      nombre: '',
      texto: '',
      valoracion: 0,
      fecha: new Date()
    };

    alert('¡Gracias por tu comentario!');
  }
}