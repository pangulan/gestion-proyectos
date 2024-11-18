import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListarComponent } from './listar/listar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InicioComponent,
    NuevoComponent,
    ListarComponent,
    VisualizarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }