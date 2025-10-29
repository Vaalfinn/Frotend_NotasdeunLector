import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  passwordChecks = {
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    noConsecutiveNumbers: true
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', Validators.required]
    });

    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.validatePassword(password);
    });

  }

  validatePassword(password: string) {
    this.passwordChecks.length = password.length >= 8;
    this.passwordChecks.uppercase = /[A-Z]/.test(password);
    this.passwordChecks.lowercase = /[a-z]/.test(password);
    this.passwordChecks.specialChar = /[^A-Za-z0-9]/.test(password);
    this.passwordChecks.noConsecutiveNumbers = !/(012|123|234|345|456|567|678|789)/.test(password);
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  onSubmit(): void {
    console.log('Enviando formulario:', this.registerForm.value);
    if (this.registerForm.valid) {
      const { nombre, email, password, rol } = this.registerForm.value;
      const userData = { nombre, email, password, rol };

      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Registro exitoso. Revisa tu correo.');
            // Redirige según el rol
            if (rol === 'ADMIN') {
              this.router.navigate(['/novedades']);
            } else if (rol === 'CLIENTE') {
              this.router.navigate(['/home']);
            } else if (rol === 'INVITADO') {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/login']);
            }
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error en el registro';
        }
      });
    }
  }
}
