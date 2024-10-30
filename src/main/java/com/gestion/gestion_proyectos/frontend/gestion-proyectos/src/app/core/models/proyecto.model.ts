export interface Proyecto {
    id?: number;
    codigoNombre: string;
    nombreComercial: string;
    fechaInicio: Date;
    fechaFin?: Date;
    estado: EstadoProyecto;
    coordinadorId: number;
}

export enum EstadoProyecto {
    PLANIFICACION = 'PLANIFICACION',
    EN_PROGRESO = 'EN_PROGRESO',
    FINALIZADO = 'FINALIZADO',
    CANCELADO = 'CANCELADO'
}