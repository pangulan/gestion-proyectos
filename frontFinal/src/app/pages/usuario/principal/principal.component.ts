import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documento.service';

@Component({
  selector: 'app-home',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  projects = [
    {
      nombreClave: 'Proyecto A',
      denominacion: 'Desarrollo de Software',
      fechaInicio: new Date('2024-01-01'),
      fechaFin: new Date('2024-12-31'),
      estado: 'En Proceso'
    },
    {
      nombreClave: 'Proyecto B',
      denominacion: 'Rediseño de Infraestructura',
      fechaInicio: new Date('2023-06-01'),
      fechaFin: new Date('2024-06-01'),
      estado: 'Completado'
    }
  ];

  recentTasks = [
    { id: 1, descripcion: 'Planificación inicial', estado: 'Completada', fechaInicio: new Date('2024-01-01') },
    { id: 2, descripcion: 'Revisión de recursos', estado: 'En Proceso', fechaInicio: new Date('2024-01-15') },
    { id: 3, descripcion: 'Análisis de requerimientos', estado: 'Pendiente', fechaInicio: new Date('2024-02-01') }
  ];

  selectedTaskId: number | null = null; // ID de la tarea seleccionada
  documentos: any[] = []; // Almacena los documentos relacionados con la tarea seleccionada

  constructor(private documentoService: DocumentoService) {}

  ngOnInit(): void {
    if (this.recentTasks.length > 0) {
      this.selectedTaskId = this.recentTasks[0].id;
      this.cargarDocumentos(this.selectedTaskId);
    }
  }

  // Cargar documentos relacionados con una tarea específica
  cargarDocumentos(tareaId: number): void {
    this.documentoService.obtenerDocumentosPorTarea(tareaId).subscribe(
      (response) => {
        this.documentos = response;
      },
      (error) => {
        console.error('Error al cargar documentos:', error);
      }
    );
  }

  // Subir un nuevo documento
  subirDocumento(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tareaId', this.selectedTaskId!.toString());

    this.documentoService.subirDocumento(formData).subscribe(
      (response) => {
        console.log('Documento subido:', response);
        this.cargarDocumentos(this.selectedTaskId!); // Refrescar la lista de documentos
      },
      (error) => {
        console.error('Error al subir documento:', error);
      }
    );
  }

}
