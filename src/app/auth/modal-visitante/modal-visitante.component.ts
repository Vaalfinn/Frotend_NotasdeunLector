import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-visitante',
  standalone: false,
  templateUrl: './modal-visitante.component.html',
  styleUrl: './modal-visitante.component.css'
})
export class ModalVisitanteComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalVisitanteComponent>,
    private router: Router
  ) { }

  goToRegister() {
    this.dialogRef.close();
    this.router.navigate(['/register']);

  }
  close(): void {
    this.dialogRef.close();
  }
}
