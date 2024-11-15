import { Injectable } from '@angular/core';
import { Proyecto} from '../models/proyecto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  baseUrl = environment.urlProyecto;
  

  constructor(private httpClient: HttpClient) { }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>(this.baseUrl+ 'proyectos/crearProyecto', proyecto);
  }

  listarProyectos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}proyectos/listarProyectos`);
  }

}
