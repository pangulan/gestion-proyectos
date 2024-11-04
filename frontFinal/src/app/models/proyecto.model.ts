import { Usuario } from './usuario.model';
import { Tarea } from './tarea.model';

export interface Proyecto {
    id?: number;
    nombreClave: string;
    denominacionComercial: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    coordinador?: Usuario;
    tareas?: Tarea[];
  }
  