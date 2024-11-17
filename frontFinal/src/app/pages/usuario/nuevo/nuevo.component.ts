import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Angular Material Snackbar

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent {
  proyectoForm: FormGroup;
  usuarios: any[] = []

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar // Angular Material Snackbar para notificaciones
  ) {
    this.proyectoForm = this.fb.group({
      nombreClave: ['', Validators.required],
      denominacionComercial: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      coordinadorIdentificacion: ['', [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar los usuarios al iniciar el componente
  }
  cargarUsuarios(): void {
    this.proyectoService.getUsuarios().subscribe(
      (response) => {
        this.usuarios = response; // Asigna los usuarios obtenidos
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.showSnackBar('Error al cargar los usuarios', 'error');
      }
    );
  }

  guardarProyecto(): void {
    if (this.proyectoForm.valid) {
      this.proyectoService.crearProyecto(this.proyectoForm.value).subscribe(
        (response) => {
          console.log('Proyecto guardado con éxito:', response);
          this.showSnackBar('Proyecto creado exitosamente', 'success');
          this.proyectoForm.reset(); // Limpia el formulario tras guardar
        },
        (error) => {
          console.error('Error al guardar el proyecto:', error);
          this.showSnackBar('Error al guardar el proyecto', 'error');
        }
      );
    } else {
      this.showSnackBar('Por favor, completa todos los campos correctamente', 'warning');
    }
  }

  // Método para mostrar la notificación
  private showSnackBar(message: string, type: 'success' | 'error' | 'warning'): void {
    const className = {
      success: 'snackbar-success',
      error: 'snackbar-error',
      warning: 'snackbar-warning',
    };

    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // 5 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: className[type], // Clase personalizada según el tipo
    });
  }
}
