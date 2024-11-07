import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon'; // Asegúrate de importar MatIconModule
import { MatCardModule } from '@angular/material/card'; // Asegúrate de importar esto
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule ,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    UsuarioRoutingModule

   ]
})
export class UsuarioModule { }