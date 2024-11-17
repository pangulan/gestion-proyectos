import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DocumentoService, Documento } from '../../services/documento.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.scss']
})
export class DocumentoListComponent implements OnInit, OnChanges {
  @Input() tareaId: number = 1; // Puede ser número o nulo
  documentos: Documento[] = [];
  selectedFile: File | null = null;
  descripcion: string = '';
  isLoading = false;

  // Tipos de archivo permitidos
  private allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'image/jpeg',
    'image/png'
  ];

  // Límite de tamaño de archivo (10MB)
  private maxFileSize = 10 * 1024 * 1024;

  constructor(
    private documentoService: DocumentoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!this.allowedFileTypes.includes(file.type)) {
        this.toastr.error('Tipo de archivo no permitido. Por favor, seleccione un archivo válido.');
        return;
      }

      if (file.size > this.maxFileSize) {
        this.toastr.error('El archivo es demasiado grande. El tamaño máximo permitido es 10MB.');
        return;
      }

      this.selectedFile = file;
    }
  }

  subirDocumento(): void {
    if (!this.selectedFile || !this.descripcion || this.tareaId === null) {
      this.toastr.warning('Por favor complete todos los campos requeridos');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('tareaId', this.tareaId.toString());
    formData.append('descripcion', this.descripcion);
    formData.append('tipo', this.selectedFile.type);
    formData.append('codigo', 'DOC-' + new Date().getTime());

    this.documentoService.subirDocumento(formData).subscribe({
      next: (response: string) => {
        try {
          const parsedResponse = JSON.parse(response); // Intenta parsear la respuesta como JSON
          console.log('Documento subido:', parsedResponse);
          this.toastr.success('Documento subido exitosamente');
          this.resetForm();
          this.cargarDocumentos();
        } catch (e) {
          console.error('Error al parsear respuesta:', e);
          this.toastr.error('Error inesperado en la respuesta del servidor');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al subir documento:', error);
        this.toastr.error('Error al subir el documento');
      }
    });
  }

  private cargarDocumentos(): void {
 
  }

  private resetForm(): void {
    this.selectedFile = null;
    this.descripcion = '';
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.isLoading = false;
  }

  descargarDocumento(documento: Documento): void {
    if (!documento || !documento.codigo) {
      this.toastr.error('No se pudo descargar el documento. Información incompleta.');
      return;
    }

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

  eliminarDocumento(documentoId: number): void {
    if (!documentoId) {
      this.toastr.error('No se pudo eliminar el documento. ID no válido.');
      return;
    }

    if (confirm('¿Está seguro de que desea eliminar este documento?')) {
      this.documentoService.eliminarDocumento(documentoId)
        .subscribe({
          next: () => {
            this.toastr.success('Documento eliminado exitosamente');
            this.cargarDocumentos();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error al eliminar documento:', error);
            this.toastr.error('Error al eliminar el documento');
          }
        });
    }
  }
}
