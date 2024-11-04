import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects = [
    { nombreClave: 'Proyecto A', denominacion: 'Desarrollo de Software', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), estado: 'En Proceso' },
    { nombreClave: 'Proyecto B', denominacion: 'Rediseño de Infraestructura', fechaInicio: new Date('2023-06-01'), fechaFin: new Date('2024-06-01'), estado: 'Completado' }
  ];

  recentTasks = [
    { descripcion: 'Planificación inicial', estado: 'Completada', fechaInicio: new Date('2024-01-01') },
    { descripcion: 'Revisión de recursos', estado: 'En Proceso', fechaInicio: new Date('2024-01-15') },
    { descripcion: 'Análisis de requerimientos', estado: 'Pendiente', fechaInicio: new Date('2024-02-01') }
  ];

  constructor() { }

  ngOnInit(): void { }
}
