import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          // Pass the entire user object to saveSession
          this.authService.saveSession(response.token, response.user);
          const userRole = this.authService.getUserRole();
          console.log('Rol del usuario:', userRole);

          if (userRole === 'ADMIN') {
            this.router.navigate(['/novedades']);
          } else if (userRole === 'CLIENTE') {
            this.router.navigate(['/home']);
          } else if (userRole === 'INVITADO') {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'No se encontró el rol del usuario. Verifica la respuesta del backend.';
          }
        },
        error: (error) => {
          console.error('Error de login:', error);
          if (error?.error?.errors && error.error.errors.length > 0) {
            // Handle validation errors
            this.errorMessage = error.error.errors.map((err: any) => err.msg).join(', ');
          } else {
            this.errorMessage = error?.error?.message || 'Error interno del servidor';
          }
        }
      });
    }
  }
}
