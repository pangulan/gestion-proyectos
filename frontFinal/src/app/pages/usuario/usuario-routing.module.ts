import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { HomeComponent } from '../home/home.component';
import { PrincipalComponent } from './principal/principal.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListarComponent } from './listar/listar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: InicioComponent},
      { path: 'inicio', component: InicioComponent},
      { path: 'principal', component: PrincipalComponent},
      { path: 'nuevo', component: NuevoComponent},
      { path: 'listar', component: ListarComponent},
      { path: 'visualizar', component: VisualizarComponent},
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }