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

  constructor(private http: HttpClient) {}

  subirDocumento(formData: FormData): Observable<string> {
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  obtenerDocumentosPorTarea(tareaId: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}/tarea/${tareaId}`);
  }

  descargarDocumento(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar/${id}`, {
      responseType: 'blob'
    });
  }

  eliminarDocumento(documentoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${documentoId}`);
  }
  obtenerTodosLosDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}/todos`);
  
  }

  verDocumento(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/ver/${id}`, {
      responseType: 'blob'
    });
  }

}
