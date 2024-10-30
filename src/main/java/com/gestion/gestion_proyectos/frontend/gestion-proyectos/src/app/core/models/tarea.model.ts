export interface Tarea {
    id?: number;
    descripcion: string;
    tipo: TipoTarea;
    fechaInicioEstimada: Date;
    fechaInicioReal?: Date;
    duracionEstimada: number;
    duracionReal?: number;
    proyectoId: number;
    empleadosIds: number[];
}

export enum TipoTarea {
    ANALISIS = 'ANALISIS',
    DESARROLLO = 'DESARROLLO',
    PRUEBAS = 'PRUEBAS',
    DOCUMENTACION = 'DOCUMENTACION'
}

export interface TareaFilter {
    proyectoId?: number;
    tipo?: TipoTarea;
    estado?: string;
}