import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoading: boolean = false; // Estado visual para procesos de carga

  constructor(private documentoService: DocumentoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

  }
 

  // Subir un nuevo documento
  subirDocumento(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.snackBar.open('Por favor selecciona un archivo', 'Cerrar', { duration: 3000 });
      return;
    }

    const allowedFormats = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'jpg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!allowedFormats.includes(fileExtension!)) {
      this.snackBar.open('Formato de archivo no permitido', 'Cerrar', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tareaId', this.selectedTaskId!.toString());

    this.isLoading = true;
    this.documentoService.subirDocumento(formData).subscribe(
      (response) => {
        console.log('Documento subido:', response);
        this.snackBar.open('Documento subido exitosamente', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al subir documento:', error);
        this.snackBar.open('Error al subir documento', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }


}
