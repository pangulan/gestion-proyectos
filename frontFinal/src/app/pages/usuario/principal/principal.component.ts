import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  projects = [
    { nombreClave: 'Proyecto A', denominacion: 'Desarrollo de Software', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), estado: 'En Proceso' },
    { nombreClave: 'Proyecto B', denominacion: 'Rediseño de Infraestructura', fechaInicio: new Date('2023-06-01'), fechaFin: new Date('2024-06-01'), estado: 'Completado' }
  ];

  recentTasks = [
    { descripcion: 'Planificación inicial', estado: 'Completada', fechaInicio: new Date('2024-01-01') },
    { descripcion: 'Revisión de recursos', estado: 'En Proceso', fechaInicio: new Date('2024-01-15') },
    { descripcion: 'Análisis de requerimientos', estado: 'Pendiente', fechaInicio: new Date('2024-02-01') }
  ];

  selectedTaskId: number = 1; // ID de la tarea seleccionada para mostrar documentos

  // Agregamos la información de documentos recientes si la necesitas
  recentDocuments = [
    { nombre: 'Especificación de Requisitos', tipo: 'PDF', fecha: new Date('2024-01-15') },
    { nombre: 'Plan de Proyecto', tipo: 'DOCX', fecha: new Date('2024-01-20') }
  ];

  constructor() { }

  ngOnInit(): void { 
    // Aquí puedes agregar lógica para cargar la tarea seleccionada
    // Por ejemplo, podrías seleccionar la primera tarea de recentTasks
    if (this.recentTasks.length > 0) {
      // this.selectedTaskId = this.recentTasks[0].id;
    }
  }
}