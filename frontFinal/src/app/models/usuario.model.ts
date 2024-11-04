import { Credencial } from './credencial.model';
import { Tarea } from './tarea.model';

export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    fechaContratacion: Date;
    credencial?: Credencial;
    tareas?: Tarea[];
  }
  