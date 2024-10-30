// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer mt-auto py-3 bg-dark text-light">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <p class="mb-0">© {{currentYear}} Gestión de Proyectos - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      bottom: 0;
      width: 100%;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}