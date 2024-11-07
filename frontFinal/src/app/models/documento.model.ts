
import { Version } from './version.model';
import { Tarea } from './tarea.model';

export interface Documento {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: string;
  rutaArchivo?: string;
  tareaId?: number;
}

export interface DocumentoResponse {
  id: number;
  codigo: string;
  descripcion: string;
  tipo: string;
  rutaArchivo: string;
  tarea: {
      id: number;
      descripcion: string;
  };
}