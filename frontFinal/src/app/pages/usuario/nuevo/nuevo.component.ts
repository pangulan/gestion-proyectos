import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../../services/proyecto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  proyectoForm: FormGroup;
  usuarioForm: FormGroup;
  usuarios: any[] = [];
  mostrandoProyecto: boolean = true;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.proyectoForm = this.fb.group({
      nombreClave: ['', Validators.required],
      denominacionComercial: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      coordinadorIdentificacion: ['', [Validators.required, Validators.min(1)]]
    });

    this.usuarioForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fechaContratacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.proyectoService.getUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.showSnackBar('Error al cargar los usuarios', 'error');
      }
    );
  }

  guardarProyecto(): void {
    if (this.proyectoForm.valid) {
      this.proyectoService.crearProyecto(this.proyectoForm.value).subscribe({
        next: (response) => {
          console.log('Proyecto guardado con éxito:', response);
          this.showSnackBar('Proyecto creado exitosamente', 'success');
          this.router.navigate(['/usuario/listar']);
        },
        error: (error) => {
          console.error('Error al guardar el proyecto:', error);
          this.showSnackBar('Error al guardar el proyecto', 'error');
        }
      });
    } else {
      this.showSnackBar('Por favor, completa todos los campos correctamente', 'warning');
    }
  }

  guardarUsuario(): void {
    if (this.usuarioForm.valid) {
      this.usuarioService.crear(this.usuarioForm.value).subscribe({
        next: (response) => {
          console.log('Usuario guardado con éxito:', response);
          this.showSnackBar('Usuario creado exitosamente', 'success');
          this.router.navigate(['/usuario/listar']);
        },
        error: (error) => {
          console.error('Error al guardar el usuario:', error);
          this.showSnackBar('Error al guardar el usuario', 'error');
        }
      });
    } else {
      this.showSnackBar('Por favor, completa todos los campos correctamente', 'warning');
    }
  }

  toggleFormulario(): void {
    this.mostrandoProyecto = !this.mostrandoProyecto;
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning'): void {
    const className = {
      success: 'snackbar-success',
      error: 'snackbar-error',
      warning: 'snackbar-warning'
    };

    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: className[type]
    });
  }
}