import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClubService {

  baseUrl = environment.urlClub;
  
  // Variable privada para almacenar el ID de la reserva
  private reservaId: number = 0;

  constructor(private httpClient: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl + 'usuarios/nuevo', usuario);
  }

  verificarCedula(cedula: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}usuarios/${cedula}`);
  }

  // Métodos para gestionar el ID de la reserva
  setReservaId(id: number): void {
    this.reservaId = id;
  }

  getReservaId(): number {
    return this.reservaId;
  }
}
