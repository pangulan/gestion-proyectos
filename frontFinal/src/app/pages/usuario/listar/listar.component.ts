import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  proyectos: any[] = [];
  usuarios: any[] = [];
  mostrandoProyectos: boolean = true;  // Para alternar entre proyectos y usuarios

  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarUsuarios();
  }

  cargarProyectos(): void {
    this.proyectoService.listarProyectos().subscribe({
      next: (proyectos) => {
        console.log('Proyectos recibidos:', proyectos);
        this.proyectos = proyectos;
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
        this.snackBar.open('Error al cargar proyectos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerTodos().subscribe({
      next: (usuarios) => {
        console.log('Usuarios recibidos:', usuarios);
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  toggleVista(): void {
    this.mostrandoProyectos = !this.mostrandoProyectos;
  }

  eliminarUsuario(id: number): void {
    if(confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}