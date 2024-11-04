import { Documento } from './documento.model';

export interface Version {
    id?: number;
    descripcion: string;
    fecha: Date;
    archivo: string;
    documento?: Documento;
  }
  