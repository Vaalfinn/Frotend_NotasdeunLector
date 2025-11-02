import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Notas de un Lector';
  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // On app start, if user is authenticated navigate to /home
    // Otherwise keep default behavior (redirect to /login)
    const currentUrl = this.router.url;
    if (this.authService.isAuthenticated()) {
      // Only redirect to home if user is at root or login page
      if (currentUrl === '/' || currentUrl === '' || currentUrl === '/login') {
        this.router.navigate(['/home']);
      }
    } else {
      // If not authenticated and at root, send to login
      if (currentUrl === '/' || currentUrl === '') {
        this.router.navigate(['/login']);
      }
    }
  }

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
