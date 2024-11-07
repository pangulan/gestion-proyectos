import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  baseUrl = environment.urlClub;

  constructor(private httpClient: HttpClient) { }

  login(credenciales: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}credenciales/login`, credenciales);
  }

  setUser(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); // Opcional: guardar en el almacenamiento local
  }

  getUser(): any {
    return this.user || JSON.parse(localStorage.getItem('user') || 'null'); // Recuperar del almacenamiento local
  }

  isLoggedIn(): boolean {
    return !!this.getUser(); // Verifica si hay un usuario almacenado
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user'); // Opcional: limpiar el almacenamiento local
  }
}
