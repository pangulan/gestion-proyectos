import { Usuario } from './usuario.model';
import { Proyecto } from './proyecto.model';
import { Documento } from './documento.model';


export interface Tarea {
    id?: number;
    descripcion: string;
    tipo: string;
    fechaInicioEstimada: Date;
    fechaInicioReal: Date;
    duracionEstimada: number;
    duracionReal: number;
    proyecto?: Proyecto;
    documentos?: Documento[];
    empleados?: Usuario[];
  }
  