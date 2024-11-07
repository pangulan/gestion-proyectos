// src/app/services/documento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Documento {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: string;
  rutaArchivo?: string;
  fechaCreacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private baseUrl = 'http://localhost:8080/api/documentos';

  constructor(private http: HttpClient) { }

  subirDocumento(formData: FormData): Observable<Documento> {
    return this.http.post<Documento>(`${this.baseUrl}/upload`, formData);
  }

  descargarDocumento(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }

  obtenerDocumentosPorTarea(tareaId: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}/tarea/${tareaId}`);
  }

  eliminarDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}