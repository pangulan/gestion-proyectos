import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  proyectos: any[] = [];

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.proyectoService.listarProyectos().subscribe({
      next: (proyectos) => {
        console.log('Proyectos recibidos:', proyectos);
        this.proyectos = proyectos;
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    });
  }

  obtenerProyectos(): void {
    this.proyectoService.listarProyectos().subscribe({
      next: (response) => {
        this.proyectos = response;
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      },
    });
  }
}
