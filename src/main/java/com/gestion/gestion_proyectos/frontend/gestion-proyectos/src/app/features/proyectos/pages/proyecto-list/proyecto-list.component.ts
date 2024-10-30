// src/app/features/proyectos/pages/proyecto-list/proyecto-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectoService } from '@core/services/proyecto.service';

@Component({
  selector: 'app-proyecto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid py-4">
      <!-- Encabezado -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Proyectos</h2>
        <button 
          class="btn btn-primary" 
          routerLink="/proyectos/nuevo"
        >
          <i class="bi bi-plus-lg"></i> Nuevo Proyecto
        </button>
      </div>

      <!-- Tabla de Proyectos -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Nombre Clave</th>
                  <th>Denominación</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                @if (loading) {
                  <tr>
                    <td colspan="6" class="text-center py-4">
                      <div class="spinner-border text-primary"></div>
                    </td>
                  </tr>
                } @else if (proyectos.length === 0) {
                  <tr>
                    <td colspan="6" class="text-center py-4">
                      No hay proyectos registrados
                    </td>
                  </tr>
                } @else {
                  @for (proyecto of proyectos; track proyecto.id) {
                    <tr>
                      <td>{{proyecto.codigoNombre}}</td>
                      <td>{{proyecto.nombreComercial}}</td>
                      <td>{{proyecto.fechaInicio | date:'dd/MM/yyyy'}}</td>
                      <td>{{proyecto.fechaFin | date:'dd/MM/yyyy'}}</td>
                      <td>
                        <span class="badge" 
                              [class]="getEstadoClass(proyecto.estado)">
                          {{proyecto.estado}}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <button 
                            class="btn btn-sm btn-outline-primary"
                            [routerLink]="['/proyectos', proyecto.id]"
                          >
                            <i class="bi bi-eye"></i>
                          </button>
                          <button 
                            class="btn btn-sm btn-outline-secondary"
                            [routerLink]="['/proyectos/editar', proyecto.id]"
                          >
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button 
                            class="btn btn-sm btn-outline-danger"
                            (click)="confirmarEliminar(proyecto)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      padding: 0.5em 0.8em;
    }
    .btn-group .btn {
      margin: 0 2px;
    }
  `]
})
export class ProyectoListComponent implements OnInit {
  proyectos: any[] = [];
  loading = false;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.loading = true;
    this.proyectoService.getProyectos()
      .subscribe({
        next: (data) => {
          this.proyectos = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar proyectos:', error);
          this.loading = false;
        }
      });
  }

  getEstadoClass(estado: string): string {
    const clases = {
      'PLANIFICACION': 'bg-info',
      'EN_PROGRESO': 'bg-primary',
      'FINALIZADO': 'bg-success',
      'CANCELADO': 'bg-danger'
    };
    return clases[estado as keyof typeof clases] || 'bg-secondary';
  }

  confirmarEliminar(proyecto: any): void {
    if (confirm(`¿Está seguro de eliminar el proyecto ${proyecto.nombreComercial}?`)) {
      this.proyectoService.deleteProyecto(proyecto.id)
        .subscribe({
          next: () => {
            this.cargarProyectos();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
          }
        });
    }
  }
}