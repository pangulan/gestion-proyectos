// src/app/core/services/tarea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Tarea {
  id?: number;
  descripcion: string;
  tipo: string;
  fechaInicioEstimada: Date;
  fechaInicioReal?: Date;
  duracionEstimada: number;
  duracionReal?: number;
  proyectoId: number;
  empleadosIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  createTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  updateTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  deleteTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTareasByProyecto(proyectoId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/proyecto/${proyectoId}`);
  }

  getTareasPendientes(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/pendientes`);
  }

  asignarEmpleados(tareaId: number, empleadosIds: number[]): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${tareaId}/asignar-empleados`,
      { empleadosIds }
    );
  }
}