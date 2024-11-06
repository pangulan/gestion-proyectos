import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: InicioComponent},
      { path: 'inicio', component: InicioComponent},
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }