import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documento.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Documento } from '../../../models/documento.model';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {
  documentos: Documento[] = [];
  isLoading = false;

  constructor(
    private documentoService: DocumentoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarTodosLosDocumentos();
  }

  cargarTodosLosDocumentos(): void {
     this.documentoService.obtenerTodosLosDocumentos().subscribe({
        next: (documentos) => {
            this.documentos = documentos;
            console.log('Documentos cargados:', documentos);
        },
        error: (error) => {
            console.error('Error al cargar documentos:', error);
            this.toastr.error('No se pudieron cargar los documentos.');
        },
    });
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
  visualizarDocumento(documento: any): void {
    const url = `http://localhost:8080/api/documentos/ver/${documento.codigo}`;
    window.open(url, '_blank');
  }
}