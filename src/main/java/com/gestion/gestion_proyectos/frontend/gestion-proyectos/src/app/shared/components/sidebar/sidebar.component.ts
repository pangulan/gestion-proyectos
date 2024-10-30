// src/app/shared/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar bg-light">
      <div class="list-group list-group-flush">
        <a 
          routerLink="/dashboard" 
          routerLinkActive="active"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-speedometer2 me-2"></i>
          Dashboard
        </a>

        <a 
          routerLink="/proyectos" 
          routerLinkActive="active"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-folder me-2"></i>
          Proyectos
        </a>

        <a 
          routerLink="/tareas" 
          routerLinkActive="active"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-list-check me-2"></i>
          Tareas
        </a>

        <a 
          routerLink="/empleados" 
          routerLinkActive="active"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-people me-2"></i>
          Empleados
        </a>

        @if (isAdmin) {
          <a 
            routerLink="/configuracion" 
            routerLinkActive="active"
            class="list-group-item list-group-item-action"
          >
            <i class="bi bi-gear me-2"></i>
            Configuración
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      position: fixed;
      left: 0;
      padding-top: 1rem;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }
    
    .list-group-item {
      border: none;
      padding: 1rem 1.5rem;
    }
    
    .list-group-item.active {
      background-color: var(--bs-primary);
      color: white;
    }

    .list-group-item:hover:not(.active) {
      background-color: rgba(0,0,0,0.05);
    }
  `]
})
export class SidebarComponent {
  isAdmin = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'ADMIN';
    });
  }
}