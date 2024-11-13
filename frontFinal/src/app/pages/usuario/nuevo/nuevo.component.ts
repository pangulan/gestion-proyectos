// nuevo.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from '../../../models/proyecto.model';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      nombreClave: ['', Validators.required],
      denominacionComercial: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      coordinador: this.fb.group({
        id: [null], // puedes ajustar según los atributos de 'Usuario'
        nombre: [''], // por ejemplo: si 'Usuario' tiene 'nombre'
        // otros campos de Usuario, si los tienes en el modelo
      }),
      tareas: this.fb.array([]) // en caso de que quieras manejar tareas en el futuro
    });
  }

  submitProject(): void {
    if (this.projectForm.valid) {
      const nuevoProyecto: Proyecto = this.projectForm.value;
      console.log('Proyecto a guardar:', nuevoProyecto);
      // Lógica para enviar los datos a tu servicio o backend
    } else {
      console.log('Formulario no válido');
    }
  }
}
