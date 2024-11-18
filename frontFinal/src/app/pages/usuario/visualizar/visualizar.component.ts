import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { DocumentoService } from '../../../services/documento.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {
  tipoVisualizacion: 'proyecto' | 'usuario' = 'proyecto';
  id: number = 0;
  proyecto: any = null;
  usuario: any = null;
  tareas: any[] = [];
  documentos: any[] = [];
  proyectosUsuario: any[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private documentoService: DocumentoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.tipoVisualizacion = params['tipo'] || 'proyecto';
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.isLoading = true;
    if (this.tipoVisualizacion === 'proyecto') {
      this.proyectoService.listarProyectos().subscribe({
        next: (proyectos) => {
          this.proyecto = proyectos.find(p => p.id === this.id);
          this.documentoService.obtenerTodosLosDocumentos().subscribe({
            next: (docs) => {
              this.documentos = docs;
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Error al cargar documentos:', error);
              this.toastr.error('Error al cargar los documentos');
              this.isLoading = false;
            }
          });
        },
        error: (error) => {
          console.error('Error al cargar proyecto:', error);
          this.toastr.error('Error al cargar el proyecto');
          this.isLoading = false;
        }
      });
    } else {
      forkJoin({
        usuario: this.usuarioService.obtenerPorId(this.id).pipe(
          catchError(error => {
            console.error('Error al obtener usuario:', error);
            this.toastr.error('Error al cargar el usuario');
            return of(null);
          })
        ),
        proyectos: this.proyectoService.listarProyectos().pipe(
          catchError(error => {
            console.error('Error al obtener proyectos:', error);
            return of([]);
          })
        )
      }).subscribe({
        next: (response) => {
          this.usuario = response.usuario;
          if (response.proyectos && Array.isArray(response.proyectos)) {
            this.proyectosUsuario = response.proyectos.filter(
              proyecto => proyecto.coordinadorIdentificacion === this.id
            );
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar datos del usuario:', error);
          this.toastr.error('Error al cargar los datos del usuario');
          this.isLoading = false;
        }
      });
    }
  }

  descargarDocumento(documento: any): void {
    this.documentoService.descargarDocumento(documento.codigo)
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: documento.tipo });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${documento.descripcion}.${documento.tipo.split('/')[1]}`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toastr.success('Documento descargado exitosamente');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al descargar documento:', error);
          this.toastr.error('Error al descargar el documento');
        }
      });
  }

  visualizarDocumento(documento: any): void {
    this.documentoService.verDocumento(documento.codigo)
      .subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: documento.tipo });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error al visualizar documento:', error);
          this.toastr.error('Error al visualizar el documento');
        }
      });
  }

  getEstadoClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'completada':
        return 'estado-completada';
      case 'en proceso':
        return 'estado-en-proceso';
      case 'pendiente':
        return 'estado-pendiente';
      default:
        return '';
    }
  }
}