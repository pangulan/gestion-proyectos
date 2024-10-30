// src/app/features/proyectos/pages/proyecto-form/proyecto-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '@core/services/proyecto.service';
import { EmpleadoService } from '@core/services/empleado.service';

@Component({
  selector: 'app-proyecto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid py-4">
      <div class="card">
        <div class="card-header">
          <h3>{{editMode ? 'Editar' : 'Nuevo'}} Proyecto</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="proyectoForm" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nombre Clave</label>
                <input 
                  type="text" 
                  class="form-control"
                  formControlName="codigoNombre"
                  [class.is-invalid]="showError('codigoNombre')"
                >
                @if (showError('codigoNombre')) {
                  <div class="invalid-feedback">
                    El nombre clave es requerido
                  </div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Denominación Comercial</label>
                <input 
                  type="text" 
                  class="form-control"
                  formControlName="nombreComercial"
                  [class.is-invalid]="showError('nombreComercial')"
                >
                @if (showError('nombreComercial')) {
                  <div class="invalid-feedback">
                    La denominación comercial es requerida
                  </div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Fecha de Inicio</label>
                <input 
                  type="date" 
                  class="form-control"
                  formControlName="fechaInicio"
                  [class.is-invalid]="showError('fechaInicio')"
                >
                @if (showError('fechaInicio')) {
                  <div class="invalid-feedback">
                    La fecha de inicio es requerida
                  </div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Fecha de Fin Estimada</label>
                <input 
                  type="date" 
                  class="form-control"
                  formControlName="fechaFin"
                  [class.is-invalid]="showError('fechaFin')"
                >
                @if (showError('fechaFin')) {
                  <div class="invalid-feedback">
                    La fecha de fin es requerida
                  </div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Estado</label>
                <select 
                  class="form-select"
                  formControlName="estado"
                  [class.is-invalid]="showError('estado')"
                >
                  <option value="">Seleccione un estado</option>
                  <option value="PLANIFICACION">Planificación</option>
                  <option value="EN_PROGRESO">En Progreso</option>
                  <option value="FINALIZADO">Finalizado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
                @if (showError('estado')) {
                  <div class="invalid-feedback">
                    El estado es requerido
                  </div>
                }
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Coordinador</label>
                <select 
                  class="form-select"
                  formControlName="coordinadorId"
                  [class.is-invalid]="showError('coordinadorId')"
                >
                  <option value="">Seleccione un coordinador</option>
                  @for (empleado of empleados; track empleado.id) {
                    <option [value]="empleado.id">
                      {{empleado.nombre}} {{empleado.apellidos}}
                    </option>
                  }
                </select>
                @if (showError('coordinadorId')) {
                  <div class="invalid-feedback">
                    El coordinador es requerido
                  </div>
                }
              </div>
            </div>

            <div class="d-flex gap-2 justify-content-end">
              <button 
                type="button" 
                class="btn btn-secondary"
                (click)="onCancel()"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="btn btn-primary"
                [disabled]="proyectoForm.invalid || loading"
              >
                @if (loading) {
                  <span class="spinner-border spinner-border-sm me-2"></span>
                }
                {{editMode ? 'Actualizar' : 'Guardar'}}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProyectoFormComponent implements OnInit {
  proyectoForm: FormGroup;
  loading = false;
  editMode = false;
  empleados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.proyectoForm = this.fb.group({
      codigoNombre: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      coordinadorId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
    
    // Verificar si estamos en modo edición
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.cargarProyecto(id);
    }
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados()
      .subscribe(empleados => this.empleados = empleados);
  }

  cargarProyecto(id: number): void {
    this.proyectoService.getProyecto(id)
      .subscribe(proyecto => {
        this.proyectoForm.patchValue(proyecto);
      });
  }

  showError(field: string): boolean {
    const control = this.proyectoForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.proyectoForm.valid) {
      this.loading = true;
      const proyecto = this.proyectoForm.value;
      
      const operation = this.editMode
        ? this.proyectoService.updateProyecto(this.route.snapshot.params['id'], proyecto)
        : this.proyectoService.createProyecto(proyecto);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/proyectos']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/proyectos']);
  }
}