// src/app/shared/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestión de Proyectos</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/proyectos" routerLinkActive="active">
                Proyectos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/tareas" routerLinkActive="active">
                Tareas
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/empleados" routerLinkActive="active">
                Empleados
              </a>
            </li>
          </ul>
          
          <div class="d-flex align-items-center">
            <span class="text-light me-3">{{ username }}</span>
            <button class="btn btn-outline-light" (click)="logout()">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-link.active {
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {
  username = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}