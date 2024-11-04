
import { Version } from './version.model';
import { Tarea } from './tarea.model';

export interface Documento {
    id?: number;
    codigo: string;
    descripcion: string;
    tipo: string;
    tarea?: Tarea;
    versiones?: Version[];
  }
  