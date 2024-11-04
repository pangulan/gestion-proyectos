import { Usuario } from './usuario.model';

export interface Credencial {
    id?: number;
    username: string;
    password: string;
    usuario?: Usuario;
  }
  