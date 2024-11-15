import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PrincipalComponent } from './usuario/principal/principal.component';
import { NuevoComponent } from './usuario/nuevo/nuevo.component';
import { ListarComponent } from './usuario/listar/listar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'usuario', children: [
      { path: 'inicio', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'principal', component: PrincipalComponent},
      { path: 'nuevo', component: NuevoComponent},
      { path: 'listar', component: ListarComponent},

    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
