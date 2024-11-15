import {LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon'; // Asegúrate de importar MatIconModule
import { MatCardModule } from '@angular/material/card'; // Asegúrate de importar esto
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListarComponent } from './listar/listar.component';

@NgModule({
  declarations: [
    InicioComponent,
    NuevoComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule ,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    UsuarioRoutingModule,

   ],
   providers: [
    {
      provide: LOCALE_ID, useValue: 'es-CO'
    }
  ],
})
export class UsuarioModule { }